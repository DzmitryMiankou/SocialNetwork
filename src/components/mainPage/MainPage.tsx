import styled from "styled-components";
import React from "react";
import UserData from "./userData/UserData";
import Dialogue from "./dialogue/Dialogue";
import useMousePosition from "../../hooks/useMousePosition";
import { Outlet } from "react-router-dom";
import Contacts from "./contacts/Contacts";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  useContactsQuery,
  useDataUserQuery,
} from "../../redux/reducers/http/httpReducer";

const Main = styled.div<{ $select: boolean }>`
  display: flex;
  position: relative;
  overflow: hidden;
  user-select: ${(prop) => (prop.$select === true ? "none" : "text")};
  height: var(--hight-blok-noHeader);
`;

const ColResize = styled.div`
  content: '" "';
  width: 1px;
  background-color: #000000;
  cursor: col-resize;
  position: absolute;
  z-index: 34;
  &:hover {
    padding: 0px 1px;
    background: #ff7300;
  }
`;

const Div = styled.div`
  position: absolute;
  background-color: #d6ab81;
  height: var(--hight-blok-noHeader);
  z-index: 24;
`;

const Div2 = styled(Div)`
  background-color: #e7c9ad;
  border-left: 1px black solid;
`;

const Div3 = styled.div`
  width: 230px;
  padding: 20px 0px 0px 40px;
  background-color: #c877148d;
`;

const But = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #e2c8af;
  border: none;
  padding: 0 0 0 3px;
  &:hover {
    background-color: #fcb97a;
  }
`;

const MainPage: React.FC = () => {
  const max = 100;
  const initial = 50;
  const boarder = 30;
  const { data } = useDataUserQuery();
  const { data: contacts } = useContactsQuery();
  const [mousUp, setmousUp] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(true);
  const mousePosition = useMousePosition({
    mouse: mousUp,
    initial: initial,
  });

  const mirror =
    mousePosition.mousePosition?.mirrPercentageX > max - boarder
      ? max - boarder
      : mousePosition.mousePosition.mirrPercentageX &&
        mousePosition.mousePosition.mirrPercentageX < boarder
      ? boarder
      : mousePosition.mousePosition.mirrPercentageX;

  const normal =
    mousePosition.mousePosition.percentageX < boarder
      ? boarder
      : mousePosition.mousePosition.percentageX &&
        mousePosition.mousePosition.percentageX > max - boarder
      ? max - boarder
      : mousePosition.mousePosition.percentageX;

  return (
    <Main
      $select={Boolean(mousUp)}
      onMouseUp={() => {
        setmousUp(false);
      }}
    >
      <Div3>
        <UserData user={data} />
        <Contacts contacts={contacts} />
      </Div3>
      <Div2
        style={{
          inset: `0% ${mirror}% 0% ${open ? 270 : 0}px`,
        }}
      >
        <But onClick={() => setOpen(!open)}>
          {open ? (
            <ArrowBackIosIcon sx={{ fontSize: "10px" }} />
          ) : (
            <ArrowForwardIosIcon sx={{ fontSize: "10px" }} />
          )}
        </But>
        <Dialogue mousUp={mousUp} />
      </Div2>
      <ColResize
        onMouseDown={() => setmousUp(true)}
        style={{
          inset: `0% 0% 0% ${normal}%`,
        }}
      />
      <Div
        style={{
          inset: `0% 0% 0% ${normal}%`,
        }}
      >
        <Outlet />
      </Div>
    </Main>
  );
};

export default MainPage;
