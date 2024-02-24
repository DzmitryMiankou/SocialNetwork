import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { SxProps } from "@mui/material";

type LinkType<T extends boolean> = {
  $mousUp: T;
  $padding: string;
  $open: T;
  $drag: T;
  $countEl: number;
  $gridArea: string;
  $gridColumns: string;
};
const LinkFriend = styled(NavLink)<LinkType<boolean>>`
  padding: ${(props) => props.$padding};
  display: grid;
  grid-template-columns: ${(props) => props.$gridColumns};
  grid-template-areas: ${(props) => props.$gridArea};
  align-items: center;
  font-size: 15px;
  transform: ${(props) =>
    props.$open
      ? `translate(-${58 * props.$countEl}px, 0)`
      : "translate(0, 0)"};
  transition: ${(props) => (props.$open ? "0.6s" : "0.3s")};
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

const SX: { icon: SxProps } = {
  icon: {
    fontSize: "16px",
    color: "#000000",
  },
};

export const St = {
  DoneAll,
  Dial,
  DateTime,
  LinkFriend,
  SX,
  MessDial,
};
