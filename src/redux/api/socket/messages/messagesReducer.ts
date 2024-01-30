import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQury, getSocket } from ".././createSocketFactory";
import { PathSocket } from ".././socket.path";
import {
  IdUsersDialogue,
  MessageType,
  MessagesType,
} from ".././socket.interface";

export const MessagesSocket = createApi({
  reducerPath: "MessagesSocket",
  baseQuery: baseQury,
  endpoints: (builder) => ({
    handlerClickKey: builder.mutation<void, void>({
      queryFn: async () => {
        const socket = await getSocket();
        return new Promise(() => {
          socket.emit("click");
        });
      },
    }),
    sendMessage: builder.mutation<MessageType, MessageType>({
      queryFn: async (chatMessageContent: MessageType) => {
        const socket = await getSocket();
        return new Promise((resolve) => {
          socket.emit(
            PathSocket.send,
            chatMessageContent,
            (message: MessageType) => {
              resolve({ data: message });
            }
          );
        });
      },
    }),
    deleteMessage: builder.mutation<IdUsersDialogue, IdUsersDialogue>({
      queryFn: async (deleteData: IdUsersDialogue) => {
        const socket = await getSocket();
        return new Promise((resolve) => {
          socket.emit(
            PathSocket.delete_messages,
            deleteData,
            (message: IdUsersDialogue) => {
              resolve({ data: message });
            }
          );
        });
      },
    }),
    getMessage: builder.query<MessagesType[], void>({
      queryFn: () => ({
        data: [],
      }),
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData, getState }
      ) {
        try {
          await cacheDataLoaded;
          const socket = await getSocket();
          const state = getState() as any;

          socket.emit(PathSocket.get_all, +state.login?.user?.id as number);

          socket.on(PathSocket.get_all, (message: MessagesType[]) => {
            updateCachedData((draft) => {
              draft.splice(0, draft.length, ...message);
            });
          });

          socket.on(PathSocket.send, (messages: MessagesType) => {
            updateCachedData((draft) => {
              draft.push(messages);
            });
          });

          await cacheEntryRemoved;
          socket.off(PathSocket.get_all);
          socket.off(PathSocket.send);
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
} = MessagesSocket;
