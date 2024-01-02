import React from "react";
import styled from "styled-components";

const Box = styled.div`
  width: 20%;
  min-width: 250px;
  height: 90vh;
  position: absolute;
  background: #ddad7e;
  top: 20px;
  left: calc(50vw - 10%);
  z-index: 99;
`;

const BG = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  background: #3d2c21b5;
  top: 0;
  z-index: 98;
  backdrop-filter: blur(2px);
  left: 0;
`;

const MoreInf: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(true);
  const closeHandle = (): void => setOpen(false);

  return (
    <>
      {open ? (
        <>
          <BG onClick={closeHandle}></BG>
          <Box>mod</Box>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default MoreInf;
