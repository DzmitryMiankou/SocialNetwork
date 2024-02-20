import { SxProps } from "@mui/material";
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
  width: 100%;
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

export const St = {
  Input,
  InputBox,
  SX,
  InputButton,
};
