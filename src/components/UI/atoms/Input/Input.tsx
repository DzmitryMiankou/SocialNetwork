import React from "react";
import { St } from "./Input.style";

type Props = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const Input: React.FC<Props> = (props) => {
  return (
    <St.Input
      onChange={props.handleChange}
      value={props.value}
      type="text"
      placeholder="search"
    />
  );
};

export default Input;
