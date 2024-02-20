import React from "react";
import { St } from "./SearchInput.style";
import Input from "../../atoms/Input/Input";
import ClearButton from "../../atoms/ClearButton/ClearButton";

type Props = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clouseHandler: () => void;
  value: string;
  bg?: string;
  colorPl?: string;
};

const SearchInput: React.FC<Props> = (props) => {
  return (
    <St.InputBox
      $bg={props.bg ?? "rgb(255, 255, 255)"}
      $colorPl={props.colorPl ?? "rgb(0, 0, 0)"}
    >
      <Input handleChange={props.handleChange} value={props.value} />
      <>
        {props.value !== "" && (
          <ClearButton clouseHandler={props.clouseHandler} />
        )}
      </>
    </St.InputBox>
  );
};

export default SearchInput;
