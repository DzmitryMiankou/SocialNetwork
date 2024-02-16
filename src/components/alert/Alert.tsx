import React from "react";
import styled from "styled-components";
import useClouseClickOut from "../../hooks/useClouseClickOut";

const ModalBox = styled.div<{ $bg: string }>`
  position: absolute;
  background-color: transparent;
  z-index: 24;
  top: 0;
  right: 0px;
  height: 100%;
`;

const Modal: React.FC<{
  open: boolean;
  num: number | undefined;
  n: number;
  component: JSX.Element;
  bg?: string;
  clouseHandler: () => void;
}> = ({ open, num, n, component, bg, clouseHandler }) => {
  const { ref } = useClouseClickOut({ clouseHandler });

  return (
    <>
      {open && num === n ? (
        <ModalBox ref={ref} $bg={bg ?? "#cead8f"}>
          {component}
        </ModalBox>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
