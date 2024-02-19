import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Socket, io } from "socket.io-client";
import { loginActions } from "../../localState/loginReducer";
import { StoreType } from "../../store";

let store: StoreType;

export const injectStore = (_store: StoreType) => (store = _store);

const createSocketFactory = () => {
  let _socket: Socket;
  return async (): Promise<Socket> => {
    if (!_socket) {
      _socket = io(`http://localhost:5000/`, {
        auth: async (cb) =>
          cb({
            Authorization: "Bearer=" + store.getState().login.token,
          }),
        transports: ["websocket"],
        withCredentials: true,
      });
    }
    _socket.on("refresh", (body: string) => {
      store.dispatch(loginActions.upTokenAction({ access_token: body }));
      _socket.connect();
    });
    if (_socket.disconnected) _socket.connect();
    return _socket;
  };
};

export const getSocket = createSocketFactory();
export const baseQury = fetchBaseQuery({
  baseUrl: `http://localhost:5000/`,
});
