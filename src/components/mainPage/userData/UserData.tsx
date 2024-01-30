import React from "react";
import styled from "styled-components";
import avatar from "../../../img/images.png";
import { UserDataS } from "../../../redux/api/httpReducer";
import Avatar from "../../avatar/Avatar";

const AvatarBox = styled.div`
  padding: 0 5px 0 0;
`;

const AvatarImg = styled.img`
  border: 1px solid black;
  max-width: 150px;
`;

const AvatarText = styled.h2`
  font-size: 18px;
`;

const UserData: React.FC<{ user: UserDataS | undefined }> = ({ user }) => {
  return (
    <AvatarBox>
      <>
        {(
          <Avatar size={150} letter={user?.firstName[0] ?? ""} fontSize={90} />
        ) ?? <AvatarImg src={avatar} alt="avatar" />}
      </>
      <AvatarText>{`${user?.firstName ?? "..."} ${
        user?.lastName ?? "..."
      }`}</AvatarText>
      <div>NickName: $Dmitry</div>
      <div>City: Mensk</div>
    </AvatarBox>
  );
};

export default UserData;
