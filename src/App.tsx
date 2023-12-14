import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Routers from "./routers/Routers";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";

const AppBox = styled.div`
  height: 100vh;
  background: #f9e5ff;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  background: var(--rssssd-color);
  border-bottom: black 5px solid;
  height: 60px;
  margin-bottom: 40px;
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: var(--size-border);
  margin: auto;
  gap: 40px;
`;

const Ul = styled.ul`
  display: flex;
  gap: 15px;
`;

const Nav = styled(NavLink)`
  text-decoration: none;
  font-size: 18px;
  color: black;
  transition: 0.2s;
  &:hover {
    color: var(--red-color);
  }
  &.active {
    color: var(--red-color);
    cursor: default;
  }
`;

const NavLogo = styled(Nav)`
  font-size: 25px;
  font-weight: 800;
`;

const InputBox = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  background: rgb(140, 75, 13);
  border: none;
  outline: none;
  color: white;
`;

const App: React.FC = () => {
  return (
    <AppBox>
      <Header>
        <HeaderDiv>
          <NavLogo to="/">MyLine</NavLogo>
          <InputBox>
            <SearchTwoToneIcon />
            <Input type="text" />
          </InputBox>
          <menu>
            <nav>
              <Ul>
                <Nav to="fdb">Aboout</Nav>
                <Nav to="fdb">Contact</Nav>
                <Nav to="auth">Regist</Nav>
                <Nav to="sign">Sign</Nav>
              </Ul>
            </nav>
          </menu>
        </HeaderDiv>
      </Header>
      <Routers />
    </AppBox>
  );
};

export default App;
