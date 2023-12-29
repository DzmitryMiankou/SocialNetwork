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
import { useGetMessageQuery } from "../../redux/reducers/http/socketReducer";

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
  background-color: #e6c6b2;
  cursor: col-resize;
  position: absolute;
  z-index: 34;
  &:hover {
    padding: 0px 1px;
    background: var(--bg-colResize);
  }
`;

const Div = styled.div`
  position: absolute;
  background-color: var(--bg-messages);
  height: var(--hight-blok-noHeader);
  z-index: 24;
`;

const Div2 = styled(Div)`
  background-color: var(--bg-dialogue);
`;

const Div3 = styled.div`
  width: 230px;
  padding: 20px 0px 0px 40px;
  background-color: var(--bg-contacts);
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
  const { data: contact } = useGetMessageQuery();
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

  console.log(contact);

  const mosePositionMirr = mousePosition.mousePosition.mirrPercentageX;
  const mosePosition = mousePosition.mousePosition.percentageX;

  const mirror =
    mosePositionMirr > max - boarder
      ? max - boarder
      : mosePositionMirr && mosePositionMirr < boarder
      ? boarder
      : mosePositionMirr;

  const normal =
    mosePosition < boarder
      ? boarder
      : mosePosition && mosePosition > max - boarder
      ? max - boarder
      : mosePosition;

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
        <But type="button" onClick={() => setOpen(!open)}>
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
        <Outlet context={[mosePosition]} />
      </Div>
    </Main>
  );
};

export default MainPage;
