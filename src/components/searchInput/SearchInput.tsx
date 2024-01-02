import { SxProps } from "@mui/material";
import React from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  0% {
    opacity: 0; 
  }
  100% {
    opacity: 1; 
    transform: rotate(90deg);
  }
`;

const InputBox = styled.div<{ $bg: string; $colorPl: string }>`
  display: flex;
  width: 170px;
  align-items: center;
  background: ${(prop) => prop.$bg};
  ::placeholder {
    color: ${(prop) => prop.$colorPl};
  }
`;

const Input = styled.input`
  border: none;
  background: transparent;
  outline: none;
  color: #ffffff;
  height: 10px;
  font-size: 14px;
  padding: 5px;
  width: 140px;
`;

const InputButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  animation: ${rotate} 300ms linear;
`;

const SX = (): { icon: SxProps } => {
  return {
    icon: {
      color: "white",
      transition: "0.2s",
      fontSize: "20px",
      "&:hover": {
        color: "#ffc289",
      },
    },
  };
};

type Props = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clouseHandler: () => void;
  value: string;
  bg?: string;
  colorPl?: string;
};

const SearchInput: React.FC<Props> = (props) => {
  return (
    <InputBox
      $bg={props.bg ?? "rgb(255, 255, 255)"}
      $colorPl={props.colorPl ?? "rgb(0, 0, 0)"}
    >
      <Input
        onChange={props.handleChange}
        value={props.value}
        type="text"
        placeholder="search"
      />
      <>
        {props.value === "" ? (
          <></>
        ) : (
          <InputButton onClick={props.clouseHandler} type="button">
            <ClearRoundedIcon sx={SX().icon} />
          </InputButton>
        )}
      </>
    </InputBox>
  );
};

export default SearchInput;
