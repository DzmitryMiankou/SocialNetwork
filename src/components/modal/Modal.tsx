import React from "react";
import styled from "styled-components";

const ModalBox = styled.div`
  position: absolute;
  background-color: #cead8f;
  z-index: 99;
  top: 0;
  right: 0px;
  height: 100%;
  padding: 0px 10px;
`;

const Modal: React.FC<{
  open: boolean;
  num: number | undefined;
  n: number;
  component: JSX.Element;
}> = ({ open, num, n, component }) => {
  return <>{open && num === n ? <ModalBox>{component}</ModalBox> : <></>}</>;
};

export default Modal;
