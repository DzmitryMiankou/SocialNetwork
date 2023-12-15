import styled from "styled-components";
import avatar from "../../img/images.png";
import React from "react";

const Main = styled.div`
  width: var(--size-border);
  margin: auto;
`;

const AvatarBox = styled.div`
  max-width: 230px;
`;

const Avatar = styled.img`
  border: 3px solid black;
  min-width: 150px;
  max-width: 230px;
`;

const AvatarText = styled.h1`
  font-size: 24px;
`;

const Friends = styled.div`
  font-size: 24px;
  margin-top: 10px;
  max-width: 230px;
`;

const FriendsText = styled.h2`
  font-size: 20px;
`;

const Friend = styled.p`
  font-size: 16px;
  margin: 7px 10px;
`;

const Line = styled.hr`
  height: 2px;
  background-color: black;
  border: none;
`;

const AvatarFriendBox = styled.li`
  display: flex;
  margin: 0px 10px;
`;

const AvatarFriend = styled.img`
  width: 30px;
  height: 30px;
`;

const MainPage = () => {
  return (
    <Main>
      <AvatarBox>
        <Avatar src={avatar} alt="avatar" />
        <AvatarText>Dzmitry Miankou</AvatarText>
        <Line></Line>
      </AvatarBox>
      <Friends>
        <FriendsText>My Friends</FriendsText>
        <Line></Line>
        <ul>
          {[
            "Ivan Melnic",
            "Alex Flerdson",
            "Alex Flerdson",
            "Alex Flerdson",
            "Ivan Melnic",
            "Ivan Melnic",
            "Ivan Melnic",
          ].map((name, i) => (
            <AvatarFriendBox key={i}>
              <AvatarFriend src={avatar} alt="avatar" />
              <Friend key={i}>{name}</Friend>
            </AvatarFriendBox>
          ))}
        </ul>
      </Friends>
    </Main>
  );
};

export default MainPage;
