import React from "react";
import { St } from "./Avatar.style";

interface AvatarType<T extends number> {
  letter: string;
  size: T;
  fontSize: T;
}

const Avatar: React.FC<AvatarType<number>> = (props) => {
  return (
    <St.AvatarName $size={props.size} $fontSize={props.fontSize}>
      {props.letter}
    </St.AvatarName>
  );
};

export default Avatar;
