import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Socket, io } from "socket.io-client";

const enum PathMessages {
  send = `send_message`,
  get_all = `all_messages`,
}

interface Message {
  timeSent: string;
  message: string;
}

export interface MessagesType {
  id: number;
  targetId: number;
  sourceId: number;
  message: string;
  pathImg: null | string;
  createdAt: string;
  updatedAt: null | string;
  target: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    activeId: string;
  };
}

let store: any;

export const injectStore = (_store: any) => (store = _store);

const createSocketFactory = () => {
  let _socket: Socket;
  return async (): Promise<Socket> => {
    const token = await store.getState().login.token;
    if (!_socket) {
      _socket = io(`http://localhost:5000/`, {
        auth: (cb) =>
          cb({
            Authorization: "Bearer=" + token,
          }),
        transports: ["websocket"],
        withCredentials: true,
      });
    }

    if (_socket.disconnected) _socket.connect();

    _socket.on("connect_error", (error: Error) => {
      console.log(error);
      return setTimeout(() => _socket.connect(), 1000);
    });
    _socket.off("connect_error");
    return _socket;
  };
};

const getSocket = createSocketFactory();

export const socketApi = createApi({
  reducerPath: "socketApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5000/`,
  }),
  endpoints: (builder) => ({
    handlerClickKey: builder.mutation<void, void>({
      queryFn: async () => {
        const socket = await getSocket();
        return new Promise((resolve) => {
          socket.emit("click");
        });
      },
    }),
    sendMessage: builder.mutation<Message, Message>({
      queryFn: async (chatMessageContent: Message) => {
        const socket = await getSocket();
        return new Promise((resolve) => {
          socket.emit(
            PathMessages.send,
            chatMessageContent,
            (message: Message) => {
              resolve({ data: message });
            }
          );
        });
      },
    }),
    getMessage: builder.query<MessagesType[], void>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;
          const socket = await getSocket();

          socket.emit(PathMessages.get_all);

          socket.on(PathMessages.get_all, (message: MessagesType[]) => {
            updateCachedData((draft) => {
              draft.splice(0, draft.length, ...message);
            });
          });

          socket.on(PathMessages.send, (messages: MessagesType) => {
            updateCachedData((draft) => {
              draft.push(messages);
            });
          });

          await cacheEntryRemoved;
          socket.off(PathMessages.get_all);
          socket.off(PathMessages.send);
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetMessageQuery,
  useSendMessageMutation,
  useHandlerClickKeyMutation,
} = socketApi;
