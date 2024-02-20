import React from "react";
import { St } from "./ContextMenuButton.style";

type PropType = {
  color: string;
  countEl: number;
  indexZ: number;
  open: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  duration: string;
  icon: JSX.Element;
  title: string;
};

export type ButtonsType = Omit<PropType, "open" | "countEl">;

const ContextMenuButton: React.FC<PropType> = (props) => {
  return (
    <St.Butt
      $bg={props.color}
      $duration={props.duration}
      onClick={props.onClick}
      $open={props.open}
      $indexZ={props.indexZ}
      $countEl={props.countEl}
      type="button"
    >
      {props.icon}
      <p style={{ color: "white" }}>{props.title}</p>
    </St.Butt>
  );
};

export default ContextMenuButton;
