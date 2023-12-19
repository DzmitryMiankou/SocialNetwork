import styled from "styled-components";
import avatar from "../../img/images.png";
import React from "react";
import UserData from "./userData/UserData";
import { InitialStateType } from "../../redux/loginReducer";
import Posters from "./posters/Posters";

const Main = styled.div<{ $select: boolean }>`
  width: var(--size-border);
  display: flex;
  margin: auto;
  position: relative;
  overflow-x: hidden;
  user-select: ${(prop) => (prop.$select === true ? "none" : "text")};
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

const ColResize = styled.div`
  content: '" "';
  width: 3px;
  background-color: #000000;
  cursor: col-resize;
  position: absolute;
  z-index: 34;
  &:hover {
    width: 6px;
    background-color: #df7714;
  }
`;

const Div = styled.div`
  position: absolute;
  background-color: #f9e5ff;
`;

const MainPage: React.FC<{ user: InitialStateType }> = ({ user }) => {
  const [mousePos, setMousePos] = React.useState<number>(280);
  const [mousdePos, setMdousePos] = React.useState<boolean>(false);
  const windowSize = React.useRef<number>(window.innerWidth);

  React.useEffect(() => {
    if (mousdePos === true) {
      const handleMouseMove = (event: MouseEvent) => {
        setMousePos(event.clientX);
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
    if (mousdePos === false) return setMousePos(mousePos);
  }, [mousdePos, mousePos]);

  return (
    <Main $select={mousdePos}>
      <div
        style={{ inset: `0% ${windowSize.current - (mousePos - 40)}px 0% 0%` }}
      >
        <UserData user={user} />
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
      </div>
      <ColResize
        onMouseDown={() => setMdousePos(true)}
        onMouseUp={() => setMdousePos(false)}
        style={{ inset: `0% 0% 0% ${mousePos - 40}px` }}
      ></ColResize>
      <Div style={{ inset: `0% 0% 0% ${mousePos - 40}px` }}>
        <Posters />
      </Div>
    </Main>
  );
};

export default MainPage;
