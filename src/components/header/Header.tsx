import React from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchInput from "./searchInput/SearchInput";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { logOutAction } from "../../redux/loginReducer";
import { useLazyLogOutUserQuery } from "../../redux/reducers/http/httpReducer";

const HeaderBox = styled.header`
  display: flex;
  align-items: center;
  background: var(--header-color);
  border-bottom: black 1px solid;
  height: var(--height-header);
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: var(--size-border);
  margin: auto;
  gap: 40px;
`;

const Ul = styled.div`
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

const Nav2 = styled.div`
  display: flex;
  align-items: center;
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    color: var(--red-color);
  }
  &.active {
    color: var(--red-color);
    cursor: default;
  }
`;

const NavLogo = styled.div`
  font-size: 22px;
  font-weight: 800;
`;

const Header: React.FC<{ user: any }> = ({ user }) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [trigger] = useLazyLogOutUserQuery();

  const handlerClick = async (): Promise<void> => {
    dispatch(logOutAction());
    navigate("/sign");
    await trigger();
  };

  return (
    <HeaderBox>
      <HeaderDiv>
        <NavLogo>MyLine</NavLogo>
        <SearchInput />
        <menu>
          <nav>
            <Ul>
              {!user.isActive ? (
                <Nav to="sign">
                  <LoginTwoToneIcon />
                </Nav>
              ) : (
                <Nav2 onClick={handlerClick}>
                  <LogoutIcon />
                </Nav2>
              )}
            </Ul>
          </nav>
        </menu>
      </HeaderDiv>
    </HeaderBox>
  );
};

export default Header;
