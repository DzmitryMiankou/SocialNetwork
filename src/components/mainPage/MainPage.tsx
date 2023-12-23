import styled from "styled-components";
import React from "react";
import UserData from "./userData/UserData";
import { InitialStateType } from "../../redux/loginReducer";
import Dialogue from "./dialogue/Dialogue";
import useMousePosition from "../../hooks/useMousePosition";
import { Outlet } from "react-router-dom";
import Contacts from "./contacts/Contacts";

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
    width: 6px;
    background: var(--rssssd-color);
  }
`;

const Div = styled.div`
  position: absolute;
  background-color: #ffc690;
`;

const Div2 = styled(Div)`
  background-color: #fad8b8;
  border-left: 1px black solid;
`;

const Div3 = styled.div`
  width: 230px;
  padding: 20px 0px 0px 40px;
  background-color: #ffe6d2;
`;

const MainPage: React.FC<{ user: InitialStateType }> = ({ user }) => {
  const [mousUp, setmousUp] = React.useState<boolean>(false);
  const mousePosition = useMousePosition({
    mouse: mousUp,
    initial: 45,
    boarder: 20,
  });

  return (
    <Main
      $select={Boolean(mousUp)}
      onMouseUp={() => {
        setmousUp(false);
      }}
    >
      <Div3>
        <UserData user={user} />
        <Contacts />
      </Div3>
      <Div2
        style={{
          inset: `0% ${
            mousePosition.mousePosition.mirrPercentageX
          }% 0% ${270}px`,
        }}
      >
        <Dialogue mousUp={mousUp} />
      </Div2>
      <ColResize
        onMouseDown={() => setmousUp(true)}
        style={{
          inset: `0% 0% 0% ${mousePosition.mousePosition.percentageX}%`,
        }}
      />
      <Div
        style={{
          inset: `0% 0% 0% ${mousePosition.mousePosition.percentageX}%`,
        }}
      >
        <Outlet />
      </Div>
    </Main>
  );
};

export default MainPage;
