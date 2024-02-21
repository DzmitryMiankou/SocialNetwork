import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { SxProps } from "@mui/material";

const Header = styled.header<{ $allWind: boolean }>`
  padding: ${(prop) => (!prop.$allWind ? "10px 40px" : "10px 20px")};
  display: flex;
  justify-content: space-between;
  background-color: #c69f76;
`;

const DragButton = styled.button`
  background: none;
  user-select: none;
  border: none;
  color: #7e664b;
  font-size: 12px;
  margin-left: 5px;
  &:hover {
    color: #7e66499b;
  }
`;
const DialoguesBox = styled.div`
  display: grid;
  grid-template-rows: 44px auto;
`;

const ScrollBox = styled.div`
  min-width: 150px;
`;

type LinkType<T> = {
  $mousUp: T;
  $allWind: T;
  $open: T;
  $drag: T;
};
const gridColumns = "40px auto 0.2fr min-content";
const gridAreas = "ava dial done time";
const gridAreasDown = "ava message . .";
const LinkFriend = styled(NavLink)<LinkType<boolean>>`
  padding: ${(props) => (!props.$allWind ? "10px 40px" : "10px 20px")};
  display: grid;
  grid-template-columns: ${(props) =>
    props.$drag ? gridColumns + " 10px" : gridColumns};
  grid-template-areas: ${(props) =>
    props.$drag
      ? `'${gridAreas + " drag"}'
         '${gridAreasDown + " ."}'`
      : `'${gridAreas}'
         '${gridAreasDown}'`};
  align-items: center;
  font-size: 15px;
  transform: ${(props) =>
    props.$open ? "translate(-180px, 0)" : "translate(0, 0)"};
  transition: ${(props) => (props.$open ? "0.5s" : "0.3s")};
  &:hover {
    background: ${(props) =>
      !props.$mousUp
        ? "linear-gradient(90deg, rgba(63, 94, 251, 0) 1%,  rgba(255, 252, 250, 0.115) 30%)"
        : ""};
  }
  &.active {
    background-color: #ffefe15e;
    cursor: default;
  }
`;

const Nowrap = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Dial = styled(Nowrap)`
  font-size: 14px;
  grid-area: dial;
`;

const MessDial = styled(Nowrap)`
  font-size: 12px;
  grid-area: message;
  color: var(--dial-mess-color);
`;

const DateTime = styled.div`
  color: grey;
  font-size: 12px;
  height: 100%;
  margin-left: auto;
  grid-area: time;
  align-items: start;
`;

const DoneAll = styled.div`
  grid-area: done;
  margin-left: auto;
`;

const Li = styled.li`
  position: relative;
`;

const Ul = styled.ul`
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(var(--hight-blok-noHeader) - 44px);
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
`;

const SX: { icon: SxProps; dragIcon: SxProps } = {
  icon: {
    fontSize: "20px",
    color: "#ffffff",
  },
  dragIcon: { fontSize: "20px", color: "#000000" },
};

export const St = {
  DoneAll,
  DialoguesBox,
  Dial,
  Li,
  DateTime,
  ScrollBox,
  Ul,
  LinkFriend,
  SX,
  MessDial,
  Header,
  DragButton,
};
