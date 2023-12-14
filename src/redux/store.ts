import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { httpReducer } from "./reducers/http/httpReducer";

const rootReducers = combineReducers({
  [httpReducer.reducerPath]: httpReducer.reducer,
});

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(httpReducer.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
