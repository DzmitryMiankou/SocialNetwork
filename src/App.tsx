import React from "react";
import styled from "styled-components";
import Routers from "./routers/Routers";
import Header from "./components/header/Header";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import MoreInf from "./components/moreInf/MoreInf";

const AppBox = styled.div`
  height: 100vh;
`;

const App: React.FC = () => {
  const user = useSelector((store: RootState) => store?.login);

  return (
    <AppBox>
      <MoreInf />
      <Header user={user} />
      <Routers user={user} />
    </AppBox>
  );
};

export default App;
