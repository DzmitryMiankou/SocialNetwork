import React from "react";
import styled from "styled-components";
import Routers from "./routers/Routers";
import Header from "./components/header/Header";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { InitialStateType } from "./redux/loginReducer";

const AppBox = styled.div`
  height: 100vh;
`;

const App: React.FC = () => {
  const user: InitialStateType | unknown = useSelector(
    (store: RootState) => store?.login
  );

  return (
    <AppBox>
      <Header user={user} />
      <Routers user={user} />
    </AppBox>
  );
};

export default App;
