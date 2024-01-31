import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { rootReducer } from "./reducers";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const blackList: Array<string> = [
  "auth",
  "DialoguesSocket",
  "moreInf",
  "MessagesSocket",
];

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  blacklist: [...blackList],
};

export const ignoredActions = [
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
];

export const persistedReducer = persistReducer(persistConfig, rootReducer);
