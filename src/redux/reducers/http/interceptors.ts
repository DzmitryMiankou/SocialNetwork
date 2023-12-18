import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { RootState } from "../../store";
import { setDataAction, logAutAction } from "../../loginReducer";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/app/",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token: any = state.login;
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    if (token) {
      headers.set("authorization", `Bearer${token.token}`);
    }
    return headers;
  },
  credentials: "include",
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery("/refreshToken", api, extraOptions);

    if (refreshResult.data) {
      api.dispatch(setDataAction(refreshResult?.data));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logAutAction());
    }
  }
  return result;
};
