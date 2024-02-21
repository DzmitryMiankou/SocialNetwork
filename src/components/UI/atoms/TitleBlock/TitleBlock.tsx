import React from "react";
import { St } from "./TitleBlock.style";

const TitleBlock: React.FC<{ text: string }> = ({ text }) => {
  return <St.H3>{text}</St.H3>;
};

export default TitleBlock;
