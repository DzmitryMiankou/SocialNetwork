import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Socket, io } from "socket.io-client";

const enum PathMessages {
  send = `send_message`,
  get_all = `all_messages`,
}

interface Message {
  id: number;
  name: string;
}

let store: any;

export const injectStore = (_store: any) => {
  store = _store;
};

const createSocketFactory = () => {
  let _socket: Socket;
  return async (): Promise<Socket> => {
    const token = await store.getState().login.token;
    if (!_socket) {
      _socket = io(`http://localhost:5000/`, {
        auth: (cb) => {
          cb({
            Authorization: "Bearer=" + token,
          });
        },
        transports: ["websocket"],
        withCredentials: true,
      });

      _socket.on("connect_error", (error: Error) => {
        console.log(error);
        setTimeout(() => {
          _socket.connect();
        }, 500);
      });
    }

    if (_socket.disconnected) {
      _socket.connect();
    }
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
    sendMessage: builder.mutation<Message, string>({
      queryFn: async (chatMessageContent: string) => {
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
    getMessage: builder.query<Message[], void>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;
          const socket = await getSocket();

          socket.emit(PathMessages.get_all);

          socket.on(PathMessages.get_all, (message) => {
            updateCachedData((draft) => {
              draft.push(message);
            });
          });

          await cacheEntryRemoved;
          socket.off(PathMessages.get_all);
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useGetMessageQuery, useSendMessageMutation } = socketApi;
