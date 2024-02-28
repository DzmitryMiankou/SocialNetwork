import { styled, keyframes } from "styled-components";

const anim = () => keyframes`
  0% {
    opacity: 0;
    transform: translate(120px, 0);
  }
  20% {
    transform: translate(0, 0);
  }
  100% {
    opacity: 1;
  }
`;

const anim2 = () => keyframes`
  0% {
    opacity: 1;
    transform: translate(-10px, 0);
  }
  20% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    transform: translate(20px, 0);
  }
`;

const DragIcon = styled.div<{ $open: boolean; $cursor: boolean }>`
  position: absolute;
  right: -10px;
  top: ${(prop) => (prop.$open ? "0" : "10px")};
  grid-area: drag;
  height: 20px;
  cursor: ${(prop) => (prop.$cursor ? "grabbing" : "grab")};
  animation-name: ${(prop) => (prop.$open ? anim : anim2)};
  animation-timing-function: ease-out;
  animation-duration: 800ms;
`;

export const St = {
  DragIcon,
};
