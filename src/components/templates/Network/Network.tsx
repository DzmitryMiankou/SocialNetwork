import { St } from "./Network.style";
import React, { useState } from "react";
import UserData from "../../UI/molecules/userData/UserData";
import Dialogue from "../../UI/organisms/dialogue/Dialogue";
import useMousePosition from "../../../hooks/useMousePosition";
import { Outlet } from "react-router-dom";
import Contacts from "../../UI/organisms/contacts/Contacts";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  useContactsQuery,
  useDataUserQuery,
} from "../../../redux/api/http/httpReducer";
import { useGetDialogueQuery } from "../../../redux/api/socket/dialogues/dialoguesReducer";
import { LogInitialStateType } from "../../../redux/localState/loginReducer";
import { useGetMessageQuery } from "../../../redux/api/socket/messages/messagesReducer";

const MainPage: React.FC<{ user: LogInitialStateType }> = ({ user }) => {
  const max = 100;
  const initial = 50;
  const boarder = 30;
  const { data } = useDataUserQuery();
  const { data: contacts } = useContactsQuery();
  const [mousUp, setmousUp] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const mousePosition = useMousePosition({
    mouse: mousUp,
    initial: initial,
  });
  const { data: messages } = useGetMessageQuery();
  const { data: dialogues } = useGetDialogueQuery();

  const mosePositionMirr = mousePosition.mirrPercentageX;
  const mosePosition = mousePosition.percentageX;

  const mirror =
    mosePositionMirr > max - boarder
      ? max - boarder
      : mosePositionMirr && mosePositionMirr < boarder
      ? boarder
      : mosePositionMirr;

  const normal =
    mosePosition < boarder
      ? boarder
      : mosePosition && mosePosition > max - boarder
      ? max - boarder
      : mosePosition;

  return (
    <St.Main
      $select={Boolean(mousUp)}
      onMouseUp={() => {
        setmousUp(false);
      }}
    >
      <St.Div3>
        <UserData user={data} />
        <Contacts contacts={contacts} />
      </St.Div3>
      <St.Div2
        style={{
          inset: `0% ${mirror}% 0% ${open ? 270 : 0}px`,
        }}
      >
        <St.But type="button" onClick={() => setOpen(!open)}>
          {open ? (
            <ArrowForwardIosIcon sx={{ fontSize: "10px" }} />
          ) : (
            <ArrowBackIosIcon sx={{ fontSize: "10px" }} />
          )}
        </St.But>
        <Dialogue
          mousUp={mousUp}
          allWind={open}
          dialogues={dialogues}
          user={user}
        />
      </St.Div2>
      <St.ColResize
        $mousUp={mousUp}
        onMouseDown={() => setmousUp(true)}
        style={{
          inset: `0% 0% 0% ${normal}%`,
        }}
      />
      <St.Div
        style={{
          inset: `0% 0% 0% ${normal}%`,
        }}
      >
        <Outlet context={[mosePosition, messages, user]} />
      </St.Div>
    </St.Main>
  );
};

export default MainPage;
