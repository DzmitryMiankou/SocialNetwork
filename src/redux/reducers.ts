import { Reducer, combineReducers } from "@reduxjs/toolkit";
import { httpReducer } from "./api/http/httpReducer";
import { MessagesSocket } from "./api/socket/messages/messagesReducer";
import { socketApi } from "./api/socket/dialogues/dialoguesReducer";
import loginReducer from "./localState/loginReducer";
import moreInfReducer from "./localState/moreInfReducer";
import { RootState } from "./store";

const reducers = {
  login: loginReducer,
  moreInf: moreInfReducer,
  [httpReducer.reducerPath]: httpReducer.reducer,
  [socketApi.reducerPath]: socketApi.reducer,
  [MessagesSocket.reducerPath]: MessagesSocket.reducer,
};

export const middleware = [
  socketApi.middleware,
  httpReducer.middleware,
  MessagesSocket.middleware,
];

export const combinedReducer = combineReducers<typeof reducers>(reducers);
export const rootReducer: Reducer<RootState> = (state, action) =>
  combinedReducer(state, action);
