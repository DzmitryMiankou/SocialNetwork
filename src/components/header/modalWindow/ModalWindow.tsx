import React from "react";
import styled from "styled-components";

const ModalBox = styled.div`
  position: absolute;
  right: 10px;
  background-color: white;
  top: 70px;
  min-width: 200px;
  width: 20vw;
`;

const MoadalWindow: React.FC<{
  data: { id: number; firstName: string; lastName: string }[] | undefined;
}> = ({ data }) => {
  return (
    <ModalBox>
      <ul>
        {data?.map(({ id, lastName }) => (
          <li key={id}>{lastName}</li>
        ))}
      </ul>
    </ModalBox>
  );
};

export default MoadalWindow;
