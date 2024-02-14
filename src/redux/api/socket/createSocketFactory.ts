import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Socket, io } from "socket.io-client";

let store: any;

export const injectStore = (_store: any) => (store = _store);

const createSocketFactory = () => {
  let _socket: Socket;
  return async (): Promise<Socket> => {
    if (!_socket) {
      _socket = io(`http://localhost:5000/`, {
        auth: async (cb) =>
          cb({
            Authorization: "Bearer=" + (await store.getState().login.token),
          }),
        transports: ["websocket"],
        withCredentials: true,
      });
    }
    _socket.on("refresh", (body: string) => {
      console.log(body);
    });
    _socket.on("rooms", (body: any) => {
      console.log(body);
    });
    if (_socket.disconnected) _socket.connect();
    return _socket;
  };
};

export const getSocket = createSocketFactory();
export const baseQury = fetchBaseQuery({
  baseUrl: `http://localhost:5000/`,
});
