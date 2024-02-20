import React from "react";
import styled from "styled-components";
import Routers from "./routers/Routers";
import Header from "./components/header/Header";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Modal from "./components/UI/atoms/Modal/Modal";
import MoreInf from "./components/UI/molecules/moreInf/MoreInf";

const AppBox = styled.div`
  height: 100vh;
`;

const App: React.FC = () => {
  const user = useSelector((store: RootState) => store.login);
  const more = useSelector((store: RootState) => store.moreInf);

  return (
    <AppBox>
      <Modal moreInf={more} component={<MoreInf />} />
      <Header user={user} moreInf={more} />
      <Routers user={user} moreInf={more} />
    </AppBox>
  );
};

export default App;
