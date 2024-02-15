import styled from "styled-components";
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
  display: flex;
  align-items: center;
  font-size: 15px;
  white-space: nowrap;
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 100%;
`;

const Butt = styled.button`
  background-color: transparent;
  border: none;
`;

const Ul = styled.ul`
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(var(--hight-blok-noHeader) - 44px);
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
`;

const DateTime = styled.div`
  color: grey;
  font-size: 12px;
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const SX: { icon: SxProps } = {
  icon: {
    fontSize: "20px",
    transition: "0.2s",
    "&:hover": {
      color: "#ffffff",
    },
  },
};

const Dial = styled.div`
  margin-left: 10px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const St = {
  PosterBox,
  Dial,
  H3,
  Li,
  Butt,
  DateTime,
  AvatarImg,
  ScrollBox,
  Ul,
  ModCom,
  LinkFrend,
  SX,
};
