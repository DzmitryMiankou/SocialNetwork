import { SxProps } from "@mui/material";
import React from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(90deg);
  }
`;

const InputBox = styled.div`
  display: flex;
  width: 170px;
  align-items: center;
  background: rgba(138, 90, 45, 0.454);
  ::placeholder {
    color: #e1b47d;
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

const SearchInput: React.FC = () => {
  const [value, setValue] = React.useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setValue(value);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setValue("");
  };

  return (
    <InputBox>
      <Input
        onChange={handleChange}
        value={value}
        type="text"
        placeholder="search"
      />
      <>
        {value === "" ? (
          <></>
        ) : (
          <InputButton onClick={handleClick} type="button">
            <ClearRoundedIcon sx={SX().icon} />
          </InputButton>
        )}
      </>
    </InputBox>
  );
};

export default SearchInput;
