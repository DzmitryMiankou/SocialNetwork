import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { combinedReducer, middleware } from "./reducers";
import { ignoredActions, persistedReducer } from "./persist";

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [...ignoredActions],
      },
    }).concat(...middleware),
});

export default store;
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducer>;
export type StoreType = typeof store;
