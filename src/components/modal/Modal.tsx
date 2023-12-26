import React from "react";
import styled from "styled-components";

const ModalBox = styled.div<{ $bg: string }>`
  position: absolute;
  background-color: ${(prop) => prop.$bg};
  z-index: 24;
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
  bg?: string;
  clouseHandler?: () => void;
}> = ({ open, num, n, component, bg, clouseHandler }) => {
  const wrapperRef = React.useRef<any>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target))
        if (clouseHandler) return clouseHandler();
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [clouseHandler]);

  return (
    <>
      {open && num === n ? (
        <ModalBox ref={wrapperRef} $bg={bg ?? "#cead8f"}>
          {component}
        </ModalBox>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
