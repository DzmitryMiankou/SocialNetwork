import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQury, getSocket } from "../createSocketFactory";
import { PathSocket } from "../socket.path";
import { DialoguesType } from "../socket.interface";

export interface User {
  id: number;
}

export interface RoomI {
  readonly id?: number;
  name?: string;
  users?: User[];
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const socketApi = createApi({
  reducerPath: "DialoguesSocket",
  baseQuery: baseQury,
  endpoints: (builder) => ({
    createRoom: builder.mutation<{}, RoomI>({
      queryFn: async (deleteData: RoomI) => {
        const socket = await getSocket();
        return new Promise((resolve) => {
          socket.emit("createRoom", deleteData, (message: RoomI) => {
            resolve({ data: message });
          });
        });
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

export const { useGetDialogueQuery, useCreateRoomMutation } = socketApi;
