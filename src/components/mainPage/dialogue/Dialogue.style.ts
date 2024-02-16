import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";
import { SxProps } from "@mui/material";

const PosterBox = styled.div`
  display: grid;
  grid-template-rows: 44px auto;
`;

const ScrollBox = styled.div`
  min-width: 150px;
`;

const LinkFrend = styled(NavLink)<{ $mousUp: boolean; $allWind: boolean }>`
  padding: ${(prop) => (!prop.$allWind ? "10px 40px" : "10px 20px")};
  display: grid;
  grid-template-columns: 40px auto 0.2fr min-content;
  grid-template-areas:
    "ava dial done time"
    "ava message . .";
  align-items: center;
  font-size: 15px;
  &:hover {
    background: ${(prop) =>
      !prop.$mousUp
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

const AvatarBox = styled.div`
  grid-area: ava;
`;

const H3 = styled.h3<{ $allWind: boolean }>`
  padding: ${(prop) => (!prop.$allWind ? "10px 40px" : "10px 20px")};
  font-size: 18px;
  background-color: #c69f76;
`;

const AvatarImg = styled.img`
  max-width: 20px;
`;

const Li = styled.li`
  position: relative;
`;

const ModCom = styled.div`
  height: 100%;
`;

const Ul = styled.ul`
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(var(--hight-blok-noHeader) - 44px);
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
`;

const opacity = keyframes`
  0% {
    transform: translate(90px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
`;

const Butt = styled.button<{ $bg: string; $duration: string; $indexZ: number }>`
  position: relative;
  background-color: transparent;
  border: none;
  background-color: ${(prop) => prop.$bg};
  height: 100%;
  width: 60px;
  animation-name: ${opacity};
  animation-timing-function: ease-in;
  animation-duration: ${(prop) => prop.$duration};
  z-index: ${(prop) => prop.$indexZ};
  transition: 0.2s;
  &:hover {
    filter: contrast(150%);
  }
`;

const SX: { icon: SxProps } = {
  icon: {
    fontSize: "20px",
    color: "#ffffff",
  },
};

export const St = {
  DoneAll,
  PosterBox,
  Dial,
  H3,
  Li,
  Butt,
  AvatarBox,
  DateTime,
  AvatarImg,
  ScrollBox,
  Ul,
  ModCom,
  LinkFrend,
  SX,
  MessDial,
};
