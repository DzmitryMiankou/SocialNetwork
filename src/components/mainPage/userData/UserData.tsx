import React from "react";
import styled from "styled-components";
import avatar from "../../../img/images.png";
import { InitialStateType } from "../../../redux/loginReducer";

const AvatarBox = styled.div``;

const Avatar = styled.img`
  border: 1px solid black;
  max-width: 150px;
`;

const AvatarText = styled.h1`
  font-size: 24px;
`;

const UserData: React.FC<{ user: InitialStateType }> = ({ user }) => {
  return (
    <AvatarBox>
      <Avatar src={avatar} alt="avatar" />
      <AvatarText>
        {`${user.user?.firstName} ${user.user?.lastName}`}
      </AvatarText>
    </AvatarBox>
  );
};

export default UserData;
