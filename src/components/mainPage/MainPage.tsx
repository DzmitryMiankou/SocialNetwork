import styled from "styled-components";
import avatar from "../../img/images.png";
import React from "react";
import UserData from "./userData/UserData";
import { InitialStateType } from "../../redux/loginReducer";
import Messages from "./messages/Messages";
import Dialogue from "./dialogue/Dialogue";
import useMousePosition from "../../hooks/useMousePosition";

const Main = styled.div<{ $select: boolean }>`
  padding: 20px 40px;
  display: flex;
  position: relative;
  overflow: hidden;
  user-select: ${(prop) => (prop.$select === true ? "none" : "text")};
  height: calc(100vh - 105px);
`;

const Friends = styled.div`
  font-size: 24px;
  margin-top: 10px;
`;

const FriendsText = styled.h2`
  font-size: 20px;
`;

const Friend = styled.p`
  font-size: 16px;
  margin: 7px 10px;
`;

const AvatarFriendBox = styled.li`
  display: flex;
  margin: 0px 10px;
`;

const AvatarFriend = styled.img`
  width: 30px;
  height: 30px;
`;

const ColResize = styled.div`
  content: '" "';
  width: 3px;
  background-color: #000000;
  cursor: col-resize;
  position: absolute;
  z-index: 34;
  &:hover {
    width: 6px;
    background: var(--rssssd-color);
  }
`;

const Div = styled.div`
  position: absolute;
  background-color: #ffc690;
`;

const Div2 = styled(Div)`
  background-color: #fad8b8;
`;

const Div3 = styled(Div)`
  position: absolute;
  padding: 20px 40px;
  background-color: #fff2e7;
`;

const MainPage: React.FC<{ user: InitialStateType }> = ({ user }) => {
  const [mousUp, setmousUp] = React.useState<boolean>(false);
  const mousePosition = useMousePosition(mousUp);

  return (
    <Main $select={mousUp} onMouseUp={() => setmousUp(false)}>
      <Div3
        style={{
          inset: `0% ${mousePosition.mousePosition.percentageX}% 0% 0%`,
        }}
      >
        <UserData user={user} />
        <Friends>
          <FriendsText>My Friends</FriendsText>
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
      </Div3>
      <ColResize
        style={{
          inset: `0% 0% 0% ${300}px`,
        }}
      />
      <Div2
        style={{
          inset: `0% ${
            mousePosition.mousePosition.mirrPercentageX
          }% 0% ${300}px`,
        }}
      >
        <Dialogue mousUp={mousUp} />
      </Div2>
      <ColResize
        onMouseDown={() => setmousUp(true)}
        style={{
          inset: `0% 0% 0% ${mousePosition.mousePosition.percentageX}%`,
        }}
      />
      <Div
        style={{
          inset: `0% 0% 0% ${mousePosition.mousePosition.percentageX}%`,
        }}
      >
        <Messages />
      </Div>
    </Main>
  );
};

export default MainPage;
