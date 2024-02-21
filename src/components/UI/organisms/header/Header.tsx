import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchInput from "../../molecules/SearchInput/SearchInput";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import {
  LogInitialStateType,
  loginActions,
} from "../../../../redux/localState/loginReducer";
import {
  useLazyLogOutUserQuery,
  useLazySearchUsersQuery,
} from "../../../../redux/api/http/httpReducer";
import MoadalWindow from "../../molecules/modalWindow/ModalWindow";

const HeaderBox = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--header-color);
  height: var(--height-header);
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: var(--size-border);
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

const LogOut = styled.div`
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

const Search = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  align-items: center;
`;

const Header: React.FC<{
  user: LogInitialStateType;
  moreInf: { id: number | null; open: boolean };
}> = ({ user, moreInf }) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [trigger] = useLazyLogOutUserQuery();
  const [search, { data }] = useLazySearchUsersQuery();
  const [value, setValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>();

  const handle = (value: string, hand: boolean): void => {
    setValue(value);
    search(value);
    setOpen(hand);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    handle(event.target.value, true);

  const clouseHandler = (): void => handle("", false);

  const handlerClick = (): void => {
    dispatch(loginActions.logOutAction());
    trigger();
    navigate("/sign");
  };

  return (
    <HeaderBox>
      <HeaderDiv>
        <NavLogo>MyLine</NavLogo>
        <Search>
          <>
            {user.isActive ? (
              <SearchInput
                handleChange={handleChange}
                clouseHandler={clouseHandler}
                value={value}
                bg="rgb(146, 95, 48)"
                colorPl="rgba(207, 151, 106, 0.624)"
              />
            ) : (
              <></>
            )}
          </>
          <Ul>
            {!user.isActive ? (
              <Nav to="sign">
                <LoginTwoToneIcon />
              </Nav>
            ) : (
              <LogOut onClick={handlerClick}>
                <LogoutIcon />
              </LogOut>
            )}
          </Ul>
        </Search>
        <>
          {data?.length !== 0 && data && open !== false ? (
            <MoadalWindow
              data={data}
              clouseHandler={clouseHandler}
              moreInf={moreInf}
            />
          ) : (
            <></>
          )}
        </>
      </HeaderDiv>
    </HeaderBox>
  );
};

export default Header;
