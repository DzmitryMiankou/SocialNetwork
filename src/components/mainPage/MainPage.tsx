import styled from "styled-components";
import avatar from "../../img/images.png";

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

const Friend = styled.li`
  font-size: 20px;
  margin: 7px 10px;
`;

const Line = styled.hr`
  height: 2px;
  background-color: black;
  border: none;
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
            <Friend key={i}>{name}</Friend>
          ))}
        </ul>
      </Friends>
    </Main>
  );
};

export default MainPage;
