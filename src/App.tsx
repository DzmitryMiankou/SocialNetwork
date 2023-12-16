import React from "react";
import styled from "styled-components";
import Routers from "./routers/Routers";
import Header from "./components/header/Header";

const AppBox = styled.div`
  height: 100vh;
  background: #f9e5ff;
`;

const App: React.FC = () => {
  return (
    <AppBox>
      <Header />
      <Routers />
    </AppBox>
  );
};

export default App;
