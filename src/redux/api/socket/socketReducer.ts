import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSocket } from "./createSocketFactory";
import { PathSocket } from "./socket.path";
import { DialoguesType, MessageType, MessagesType } from "./socket.interface";

export const socketApi = createApi({
  reducerPath: "socketApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5000/`,
  }),
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
    getDialogue: builder.query<DialoguesType[], void>({
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

          socket.emit(PathSocket.dialogues, state.login?.user?.id as number);

          socket.on(PathSocket.dialogues, (message: DialoguesType[]) => {
            updateCachedData((draft) => {
              draft.splice(0, draft.length, ...message);
            });
          });

          socket.on(PathSocket.dialogue_one, (di: DialoguesType) => {
            updateCachedData((draft) => {
              draft.find(
                (el) =>
                  !(
                    (el.targetId !== di.targetId ||
                      el.sourceId !== di.sourceId) &&
                    (el.targetId !== di.sourceId ||
                      el.sourceId !== di.targetId) &&
                    +new Date(el.createdAt) < +new Date(di.createdAt)
                  ) && (el.createdAt = di.createdAt)
              );

              !draft.find(
                (el) =>
                  el.targetId === di.targetId || el.sourceId === di.targetId
              ) && draft.push(di);
            });
          });

          await cacheEntryRemoved;
          socket.off(PathSocket.dialogues);
          socket.off(PathSocket.dialogue_one);
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
  useGetDialogueQuery,
} = socketApi;
