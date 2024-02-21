import React from "react";
import Avatar from "../../atoms/Avatar/Avatar";
import { St } from "./AvatarBox.style";

type Props = { size: number; letter: string; fontSize: number; src: string };

const AvatarBox: React.FC<Props> = ({ size, letter, fontSize, src }) => {
  return (
    <St.AvatarBox>
      {<Avatar size={size} letter={letter} fontSize={fontSize} /> ?? (
        <St.AvatarImg src={src} alt="avatar" />
      )}
    </St.AvatarBox>
  );
};

export default AvatarBox;
