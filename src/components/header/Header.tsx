import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import SearchInput from "./searchInput/SearchInput";

const HeaderBox = styled.header`
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

const Header: React.FC = () => {
  return (
    <HeaderBox>
      <HeaderDiv>
        <NavLogo to={`/`}>MyLine</NavLogo>
        <SearchInput />
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
    </HeaderBox>
  );
};

export default Header;
