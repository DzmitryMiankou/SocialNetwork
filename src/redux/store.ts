import { Reducer, combineReducers, configureStore } from "@reduxjs/toolkit";
import { httpReducer } from "./api/http/httpReducer";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import loginReducer from "./loginReducer";
import { socketApi } from "./api/socket/socketReducer";
import moreInfReducer from "./moreInfReducer";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  blacklist: ["auth", "socketApi", "moreInf"],
};

const reducers = {
  login: loginReducer,
  moreInf: moreInfReducer,
  [httpReducer.reducerPath]: httpReducer.reducer,
  [socketApi.reducerPath]: socketApi.reducer,
};
const combinedReducer = combineReducers<typeof reducers>(reducers);

const rootReducer: Reducer<RootState> = (state, action) =>
  combinedReducer(state, action);

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(socketApi.middleware, httpReducer.middleware),
});

export default store;
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducer>;
