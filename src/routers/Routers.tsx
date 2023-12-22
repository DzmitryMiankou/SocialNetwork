import { Routes, Route } from "react-router-dom";
import Reg from "../components/reg/Reg";
import Login from "../components/login/Login";
import MainPage from "../components/mainPage/MainPage";
import Messages from "../components/mainPage/messages/Messages";
import React from "react";

const Routers: React.FC<any> = ({ user }) => {
  const arrToElem: Array<{
    element: JSX.Element;
    path: string;
    inRoute?: JSX.Element[];
  }> = [
    { element: <div>noMatch</div>, path: "*" },
    {
      element: user?.isActive === true ? <div>Search</div> : <div>no</div>,
      path: "users/:id",
    },
    { element: <Reg />, path: "auth" },
    { element: <Login />, path: "sign" },
  ];

  return (
    <Routes>
      <Route
        path="/"
        element={
          user?.isActive === true ? <MainPage user={user} /> : <div>no</div>
        }
      >
        <Route
          index
          element={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              choose who you would like to write to
            </div>
          }
        ></Route>
        <Route path="/:idM" element={<Messages />}></Route>
      </Route>
      {arrToElem.map(({ element, path, inRoute }, i) => (
        <Route key={i} path={path} element={element}>
          {inRoute?.map((data, i) => (
            <React.Fragment key={`rout-${i}`}>{data}</React.Fragment>
          ))}
        </Route>
      ))}
    </Routes>
  );
};

export default Routers;
