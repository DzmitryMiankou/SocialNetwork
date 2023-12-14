import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AcceptsType {
  email: string;
  password: string;
}

export const httpReducer = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/app/",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }),
  endpoints: (build) => ({
    authUser: build.mutation<AcceptsType, AcceptsType>({
      query: (body: AcceptsType) => ({
        method: "POST",
        url: "login",
        body,
      }),
    }),
  }),
});

export const { useAuthUserMutation } = httpReducer;
