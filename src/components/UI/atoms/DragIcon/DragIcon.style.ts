import { styled } from "styled-components";

const DragIcon = styled.div<{ $drag: boolean }>`
  display: ${(prop) => (prop.$drag ? "block" : "none")};
  grid-area: drag;
  height: 20px;
  cursor: grab;
`;

export const St = {
  DragIcon,
};
