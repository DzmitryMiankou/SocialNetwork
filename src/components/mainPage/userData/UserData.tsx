import React from "react";
import styled from "styled-components";
import avatar from "../../../img/images.png";
import { useParams } from "react-router-dom";
import { InitialStateType } from "../../../redux/loginReducer";

const AvatarBox = styled.div``;

const Avatar = styled.img`
  border: 3px solid black;
`;

const AvatarText = styled.h1`
  font-size: 24px;
`;

const Line = styled.hr`
  height: 2px;
  background-color: black;
  border: none;
`;

const UserData: React.FC<{ user: InitialStateType }> = ({ user }) => {
  const users = useParams();
  const userData: string[] | `` = users?.id?.split(`_`) || ``;

  return (
    <AvatarBox>
      <Avatar src={avatar} alt="avatar" />
      <AvatarText>
        {userData === ``
          ? `${user.user?.firstName} ${user.user?.lastName}`
          : `${userData[0].replace(`:`, "")} ${userData[2]}`}
      </AvatarText>
      <Line></Line>
    </AvatarBox>
  );
};

export default UserData;
