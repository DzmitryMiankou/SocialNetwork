import React from "react";
import styled from "styled-components";
import avatar from "../../../img/images.png";
import { ContactsType } from "../../../redux/reducers/http/httpReducer";
import { NavLink } from "react-router-dom";

const Friends = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const FriendsText = styled.h2`
  font-size: 18px;
  padding: 20px 0px 10px 0px;
  border-bottom: var(--block-border);
`;

const Friend = styled.p`
  font-size: 14px;
`;

const AvatarFriendBox = styled(NavLink)`
  display: flex;
  padding: 10px 0px;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    background: #ffffff95;
  }
`;

const AvatarFriend = styled.img`
  width: 30px;
  height: 30px;
`;

const Ul = styled.ul`
  height: calc(var(--hight-blok-noHeader) - 320px);
  overflow-y: scroll;
`;

const Contacts: React.FC<{ contacts: ContactsType[] | undefined }> = ({
  contacts,
}) => {
  return (
    <Friends>
      <FriendsText>Contacts</FriendsText>
      <Ul>
        {contacts?.map(({ id, contactId }) => (
          <AvatarFriendBox
            key={id}
            to={`/:${contactId?.id}_${contactId?.firstName}_${contactId?.lastName}`}
          >
            <AvatarFriend src={avatar} alt="avatar" />
            <Friend>{`${contactId?.lastName} ${contactId?.firstName}`}</Friend>
          </AvatarFriendBox>
        ))}
      </Ul>
    </Friends>
  );
};

export default Contacts;
