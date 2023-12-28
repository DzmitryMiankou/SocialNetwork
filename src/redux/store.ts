import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { httpReducer } from "./reducers/http/httpReducer";
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
import { socketApi } from "./reducers/http/socketReducer";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  blacklist: ["auth", "socketApi"],
};

const rootReducers = combineReducers({
  login: loginReducer as any,
  [httpReducer.reducerPath]: httpReducer.reducer,
  [socketApi.reducerPath]: socketApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(httpReducer.middleware, socketApi.middleware),
});

export default store;
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducers>;
export type AppDispatch = typeof store.dispatch;
