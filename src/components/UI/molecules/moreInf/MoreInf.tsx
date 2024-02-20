import React from "react";
import styled from "styled-components";
import Avatar from "../../atoms/Avatar/Avatar";

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const MoreInf: React.FC = () => {
  return (
    <Box>
      <Avatar size={250} letter="D" fontSize={150} />
    </Box>
  );
};

export default MoreInf;
