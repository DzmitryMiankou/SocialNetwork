import styled, { keyframes } from "styled-components";
import { StyleProp } from "./Modal";

const opacity = keyframes`
  0% {
    filter: opacity(0);  
  }
  100% {
    filter: opacity(1)
  }
`;

const opacityEnd = keyframes`
  0% {
    filter: opacity(1);  
  }
  100% {
    filter: opacity(0)
  }
`;

const Box = styled.div<StyleProp>`
  width: 20%;
  min-width: 250px;
  height: 90vh;
  position: absolute;
  background: #ddad7e;
  top: ${(prop) => prop.$top + "px"};
  left: ${(prop) => prop.$left};
  z-index: 99;
  animation: ${(prop) => (prop.$anim ? opacity : opacityEnd)} 0.1s linear;
`;

const BG = styled.div<{ $anim?: boolean }>`
  height: 100vh;
  width: 100vw;
  position: absolute;
  background: #3d2c21b5;
  top: 0;
  z-index: 98;
  backdrop-filter: blur(2px);
  left: 0;
  animation: ${(prop) => (prop.$anim ? opacity : opacityEnd)} 0.1s linear;
`;

export const St = {
  BG,
  Box,
};
