import React from "react";
import styled from "styled-components";
import Routers from "./routers/Routers";
import Header from "./components/header/Header";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Modal from "./components/modal/Modal";
import MoreInf from "./components/moreInf/MoreInf";
import { LogInitialStateType } from "./redux/loginReducer";

const AppBox = styled.div`
  height: 100vh;
`;

const App: React.FC = () => {
  const user = useSelector(
    (store: RootState) => store?.login
  ) as LogInitialStateType;
  const more = useSelector((store: RootState) => store.moreInf);

  return (
    <AppBox>
      <Modal moreInf={more} component={<MoreInf />} />
      <Header user={user} />
      <Routers user={user} />
    </AppBox>
  );
};

export default App;
