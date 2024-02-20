import styled from "styled-components";

const AvatarName = styled.div<{ $size: number; $fontSize: number }>`
  min-width: ${(prop) => prop.$size + "px"};
  width: ${(prop) => prop.$size + "px"};
  height: ${(prop) => prop.$size + "px"};
  background-color: var(--bg-avatar);
  font-size: ${(prop) => prop.$fontSize + "px"};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const St = {
  AvatarName,
};
