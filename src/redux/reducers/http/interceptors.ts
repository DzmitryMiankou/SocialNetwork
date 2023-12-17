import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
//import { tokenReceived, loggedOut } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/app/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer=<token>`,
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
      // store the new token
      //api.dispatch(tokenReceived(refreshResult.data));
      // retry the initial query
      //  result = await baseQuery(args, api, extraOptions);
    } else {
      //api.dispatch(loggedOut());
    }
  }
  return result;
};
