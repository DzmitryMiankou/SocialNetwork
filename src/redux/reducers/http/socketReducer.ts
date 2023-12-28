import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Socket, io } from "socket.io-client";

interface Message {
  id: number;
  name: string;
}

let socket: Socket;
function getSocket() {
  if (!socket) {
    socket = io(`http://localhost:5000/`, {
      transports: ["websocket"],
      withCredentials: true,
    });
  }
  return socket;
}

export const socketApi = createApi({
  reducerPath: "socketApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5000/`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation<Message, string>({
      queryFn: (chatMessageContent: string) => {
        const socket = getSocket();
        return new Promise((resolve) => {
          socket.emit(
            `send_message`,
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
          const socket = getSocket();

          socket.emit(`all_messages`, "hi");

          socket.on("all_messages", (message) => {
            updateCachedData((draft) => {
              draft.push(message);
            });
          });

          await cacheEntryRemoved;
          socket.off("all_messages");
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useGetMessageQuery, useSendMessageMutation } = socketApi;
