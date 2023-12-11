import React from "react";
import Form from "./components/form/Form";
import styled from "styled-components";
import Login from "./components/login/Login";

const AppBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const App: React.FC = () => {
  return (
    <AppBox>
      <Form />
      <Login />
    </AppBox>
  );
};

export default App;
