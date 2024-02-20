import React from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { St } from "./SearchInput.style";

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
      <St.Input
        onChange={props.handleChange}
        value={props.value}
        type="text"
        placeholder="search"
      />
      <>
        {props.value === "" ? (
          <></>
        ) : (
          <St.InputButton onClick={props.clouseHandler} type="button">
            <ClearRoundedIcon sx={St.SX().icon} />
          </St.InputButton>
        )}
      </>
    </St.InputBox>
  );
};

export default SearchInput;
