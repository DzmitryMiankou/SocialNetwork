import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AcceptsType {
  email: string;
  password: string;
}

export interface RegType extends AcceptsType {
  firstName: string;
  lastName: string;
}

interface UserDataType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  access_token: string;
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
    authUser: build.mutation<UserDataType, AcceptsType>({
      query: (body: AcceptsType) => ({
        method: "POST",
        url: "login",
        body,
      }),
    }),
    regUser: build.mutation<void, RegType | { code: null; message: string }>({
      query: (body: RegType) => ({
        method: "POST",
        url: "reg_user",
        body,
      }),
    }),
  }),
});

export const { useAuthUserMutation, useRegUserMutation } = httpReducer;
