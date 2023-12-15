import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Routers from "./routers/Routers";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";

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
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 20px;
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
  background: rgb(140, 75, 13);
`;

const Input = styled.input`
  border: none;
  background: transparent;
  outline: none;
  color: white;
  padding: 5px 8px;
`;

const InputButton = styled.button`
  border: none;
  background: rgb(105, 56, 11);
`;

const App: React.FC = () => {
  return (
    <AppBox>
      <Header>
        <HeaderDiv>
          <NavLogo to="/">MyLine</NavLogo>
          <InputBox>
            <Input type="text" />
            <InputButton type="button">
              <SearchTwoToneIcon
                sx={{
                  color: "rgb(255, 169, 89)",
                  transition: "0.2s",
                  "&:hover": {
                    color: "var(--red-color)",
                  },
                }}
              />
            </InputButton>
          </InputBox>
          <menu>
            <nav>
              <Ul>
                <Nav to="auth">
                  <LoginTwoToneIcon />
                </Nav>
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
