import { keyframes, styled } from "styled-components";

const opacity = (n: number) => keyframes`
  0% {
    transform: translate(calc(90px * ${n + 2}), 0);
  }
  100% {
    transform: translate(0, 0);
  }
`;

/*const opacity2 = (n: number) => keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(280px, 0);
     opacity: 0;
  }
`;*/

const Butt = styled.button<{
  $bg: string;
  $duration: string;
  $indexZ: number;
  $countEl: number;
  $open: boolean;
}>`
  position: relative;
  background-color: transparent;
  border: none;
  background-color: ${(prop) => prop.$bg};
  height: 100%;
  width: 60px;
  animation-name: ${(prop) => opacity(prop.$countEl)};
  animation-timing-function: ease;
  animation-duration: ${(prop) => prop.$duration};
  z-index: ${(prop) => prop.$indexZ};
  transition: 0.2s;
  &:hover {
    filter: contrast(150%);
  }
`;

export const St = {
  Butt,
};
