import React from "react";
import styled from "styled-components";
import avatar from "../../../img/images.png";

const Friends = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const FriendsText = styled.h2`
  font-size: 20px;
  padding: 20px 0px 10px 0px;
`;

const Friend = styled.p`
  font-size: 15px;
`;

const AvatarFriendBox = styled.li`
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
  height: calc(100vh - 380px);
  overflow-y: scroll;
`;

const Contacts = () => {
  return (
    <Friends>
      <FriendsText>Contacts</FriendsText>
      <Ul>
        {[
          "Ivan Melnic",
          "Alex Flerdson",
          "Alex Flerdson",
          "Alex Flerdson",
          "Ivan Melnic",
          "Ivan Melnic",
          "Ivan Melnic",
          "Alex Flerdson",
          "Alex Flerdson",
          "Alex Flerdson",
          "Ivan Melnic",
          "Alex Flerdson",
          "Alex Flerdson",
          "Alex Flerdson",
          "Ivan Melnic",
          "Ivan Melnic",
          "Alex Flerdson",
          "Alex Flerdson",
          "Ivan Melnic",
        ].map((name, i) => (
          <AvatarFriendBox key={i}>
            <AvatarFriend src={avatar} alt="avatar" />
            <Friend key={i}>{name}</Friend>
          </AvatarFriendBox>
        ))}
      </Ul>
    </Friends>
  );
};

export default Contacts;
