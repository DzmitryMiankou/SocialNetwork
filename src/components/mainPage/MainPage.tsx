import styled from "styled-components";
import avatar from "../../img/images.png";
import React from "react";
import UserData from "./userData/UserData";
import { InitialStateType } from "../../redux/loginReducer";
import Messages from "./messages/Messages";
import Dialogue from "./dialogue/Dialogue";

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
    background: var(--rssssd-color);
  }
`;

const Div = styled.div`
  position: absolute;
  background-color: #d197e1;
`;

const ColResize2 = styled(ColResize)`
  position: absolute;
`;

const Div2 = styled.div`
  background-color: #e5bdf0;
`;

const MainPage: React.FC<{ user: InitialStateType }> = ({ user }) => {
  const [mousePos, setMousePos] = React.useState<number>(580);
  const [mousUp, setmousUp] = React.useState<boolean>(false);
  const [sizeWind, setSizeWind] = React.useState<number>(window.innerWidth);

  React.useEffect(() => {
    const updateSize = (): void => {
      setSizeWind(window.innerWidth);
    };
    if (mousePos > sizeWind - 340) {
      setMousePos(sizeWind - 340);
    }
    if (mousePos < 380) {
      setMousePos(380);
    }
    if (mousUp === true) {
      const handleMouseMove = (event: MouseEvent): void => {
        setMousePos(event.clientX);
      };
      window.addEventListener("resize", updateSize);
      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
    if (mousUp === false) return setMousePos(mousePos);
  }, [mousUp, mousePos, sizeWind]);

  return (
    <Main $select={mousUp} onMouseUp={() => setmousUp(false)}>
      <div
        style={{
          inset: `0% ${((mousePos / sizeWind) * 100).toFixed(2)}% 0% 0%`,
        }}
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
      <ColResize2
        style={{
          inset: `0% 0% 0% ${300}px`,
        }}
      />
      <Div2
        style={{
          inset: `0% ${(100 - (mousePos / sizeWind) * 100).toFixed(
            2
          )}% 0% ${300}px`,
          position: "absolute",
        }}
      >
        <Dialogue />
      </Div2>
      <ColResize
        onMouseDown={() => setmousUp(true)}
        style={{
          inset: `0% 0% 0% ${((mousePos / sizeWind) * 100).toFixed(2)}%`,
        }}
      />
      <Div
        style={{
          inset: `0% 0% 0% ${((mousePos / sizeWind) * 100).toFixed(2)}%`,
        }}
      >
        <Messages />
      </Div>
    </Main>
  );
};

export default MainPage;
