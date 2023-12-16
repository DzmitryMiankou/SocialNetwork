import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const ModalBox = styled.div`
  position: absolute;
  right: 10px;
  background-color: white;
  top: 50px;
  min-width: 200px;
  width: 20vw;
`;

const UserBox = styled.li`
  border-bottom: black solid 2px;
  transition: 0.2s;
  &:hover {
    background-color: #ffc18f;
  }
`;
const UserLink = styled(NavLink)`
  display: block;
  padding: 10px 8px;
  text-decoration: none;
  color: black;
  transition: 0.2s;
  &.active {
    color: rgb(210, 69, 8);
    cursor: default;
    background-color: #ffc18f;
  }
`;

const MoadalWindow: React.FC<{
  data: { id: number; firstName: string; lastName: string }[] | undefined;
}> = ({ data }) => {
  return (
    <ModalBox>
      <ul>
        {data?.map(({ id, lastName, firstName }) => (
          <UserBox key={id}>
            <UserLink to={`/users/:${firstName}_${id}_${lastName}`}>
              <p>{`${firstName} ${lastName}`}</p>
            </UserLink>
          </UserBox>
        ))}
      </ul>
    </ModalBox>
  );
};

export default MoadalWindow;
