import { SxProps } from "@mui/material";
import React from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import styled from "styled-components";

const InputBox = styled.div`
  display: flex;
  align-items: center;
  background: rgba(138, 90, 45, 0.454);
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
`;

const SX = (): { icon: SxProps; icon2: SxProps } => {
  return {
    icon: {
      color: "white",
      transition: "0.2s",
      fontSize: "20px",
      "&:hover": {
        color: "#d0d0d0",
      },
    },
    icon2: {
      color: "#ffd297",
      fontSize: "20px",
    },
  };
};

const SearchContact: React.FC = () => {
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
      <>
        {value === "" ? (
          <></>
        ) : (
          <InputButton onClick={handleClick} type="button">
            <ClearRoundedIcon sx={SX().icon} />
          </InputButton>
        )}
      </>
      <Input onChange={handleChange} value={value} type="text" />
      <SearchTwoToneIcon sx={SX().icon2} />
    </InputBox>
  );
};

export default SearchContact;
