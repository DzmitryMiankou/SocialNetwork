import React from "react";
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

interface AvatarType {
  letter: string;
  size: number;
  fontSize: number;
}

const Avatar: React.FC<AvatarType> = (props) => {
  return (
    <AvatarName $size={props.size} $fontSize={props.fontSize}>
      {props.letter}
    </AvatarName>
  );
};

export default Avatar;
