import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Routers from "./routers/Routers";

const AppBox = styled.div`
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  background: var(--rssssd-color);
  height: 60px;
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: var(--size-border);
  margin: auto;
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

const App: React.FC = () => {
  return (
    <AppBox>
      <Header>
        <HeaderDiv>
          <NavLogo to="/">MyRound</NavLogo>
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
