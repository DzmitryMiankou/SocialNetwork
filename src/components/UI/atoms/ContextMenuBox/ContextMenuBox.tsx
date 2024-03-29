import React from "react";
import styled from "styled-components";
import useClouseClickOut from "../../../../hooks/useClouseClickOut";
import useBooleanTimer from "../../../../hooks/useBooleanTimer";

const ModalBox = styled.div<{ $bg: string }>`
  position: absolute;
  background-color: transparent;
  z-index: 90;
  top: 0;
  right: 0;
  height: 100%;
`;

const ContextMenuBox: React.FC<{
  num: number | undefined;
  n: number;
  component: JSX.Element;
  bg?: string;
  clouseHandler: () => void;
}> = ({ num, n, component, bg, clouseHandler }) => {
  const { ref } = useClouseClickOut({ clouseHandler });
  const open = useBooleanTimer({ bool: num === n, delay: 150 });
  return (
    <>
      {open && (
        <ModalBox ref={ref} $bg={bg ?? "#3e2a17"}>
          {component}
        </ModalBox>
      )}
    </>
  );
};

export default ContextMenuBox;
