import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../interceptors";

interface AcceptsType {
  email: string;
  password: string;
}

export interface RegType extends AcceptsType {
  firstName: string;
  lastName: string;
}

export interface UserDataS {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserDataType extends RegType {
  id: number;
  access_token: string;
}

export const httpReducer = createApi({
  reducerPath: "auth",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    searchUsers: build.query<
      { id: number; firstName: string; lastName: string }[],
      string | number
    >({
      query: (params) => ({
        url: `allUsers/:${params}`,
      }),
    }),
    logOutUser: build.query<void, void>({
      query: () => ({
        url: `logOut`,
      }),
    }),
    dataUser: build.query<UserDataS, void>({
      query: () => ({
        url: `user`,
      }),
    }),
    authUser: build.mutation<UserDataType, AcceptsType>({
      query: (body: AcceptsType) => ({
        method: "POST",
        url: "login",
        body,
      }),
    }),
    regUser: build.mutation<void, RegType | { code: number; message: string }>({
      query: (body: RegType) => ({
        method: "POST",
        url: "reg_user",
        body,
      }),
    }),
    newContact: build.mutation<void, any | { code: number; message: string }>({
      query: (body: { id: number }) => ({
        method: "POST",
        url: "new_contact",
        body,
      }),
    }),
  }),
});

export const {
  useAuthUserMutation,
  useRegUserMutation,
  useLazySearchUsersQuery,
  useLazyLogOutUserQuery,
  useDataUserQuery,
  useNewContactMutation,
} = httpReducer;
