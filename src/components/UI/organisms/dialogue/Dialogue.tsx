import React from "react";
import { St } from "./Dialogue.style";
import avatar from "../../../../img/images.png";
import Avatar from "../../atoms/Avatar/Avatar";
import { LogInitialStateType } from "../../../../redux/localState/loginReducer";
import { DialoguesType } from "../../../../redux/api/socket/socket.interface";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { AppDispatch } from "../../../../redux/store";
import { useDispatch } from "react-redux";
import { setDataMoreInfAction } from "../../../../redux/localState/moreInfReducer";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Buttons from "../../atoms/Buttons/Buttons";
import ContextMenu from "../../molecules/ContextMenu/ContextMenu";
import TitleBlock from "../../atoms/TitleBlock/TitleBlock";

type PropType = {
  mousUp: boolean;
  allWind: boolean;
  dialogues: DialoguesType[] | undefined;
  user: LogInitialStateType;
};

const Dialogue: React.FC<PropType> = ({ mousUp, allWind, dialogues, user }) => {
  const [id, setId] = React.useState<number>();
  const [drag, setDrag] = React.useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const dragHandler = () => setDrag(!drag);

  const contextHandler = (
    e: React.MouseEvent<HTMLElement>,
    id: number
  ): void => {
    e.preventDefault();
    setId(id);
    setDrag(false);
  };

  const clouseHandler = () => setId(0);

  const correctDate = (date: string): string => {
    const dialDate = new Date(date);
    const nowDate = new Date();

    type DateOptionType = Intl.DateTimeFormatOptions;

    type OptionDateType<T extends Intl.DateTimeFormatOptions> = {
      year: T;
      hour: T;
      weekday: T;
      yearDayMonth: T;
    };

    const optionDate: OptionDateType<DateOptionType> = {
      year: { year: "numeric" },
      hour: { hour: "2-digit", minute: "2-digit", hour12: false },
      weekday: { weekday: "short" },
      yearDayMonth: { year: "numeric", day: "numeric", month: "numeric" },
    };

    const getDate = (date: Date, option: DateOptionType): string =>
      date.toLocaleDateString("en-US", option);

    const dialYear = getDate(dialDate, optionDate.year);
    const nowYear = getDate(nowDate, optionDate.year);
    const nowWeek = getDate(nowDate, optionDate.weekday);
    const dialWeek = getDate(dialDate, optionDate.weekday);
    const nowDay = getDate(nowDate, optionDate.yearDayMonth);
    const dialDay = getDate(dialDate, optionDate.yearDayMonth);

    if (nowYear !== dialYear) return dialYear;
    if (nowWeek !== dialWeek || nowDay !== dialDay) return dialWeek;

    return dialDate.toLocaleTimeString("en-US", optionDate.hour);
  };

  const sortArr = (arr: DialoguesType[]) =>
    arr?.sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));

  const idUser = user?.user?.id;

  const getAllInfUser = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number | undefined
  ): void => {
    e.preventDefault();
    dispatch(setDataMoreInfAction(id ?? 0));
  };

  return (
    <St.DialoguesBox>
      <St.Header $allWind={allWind}>
        <TitleBlock text="Dialogue" />
        <St.DragButton onClick={dragHandler} type="button">
          change
        </St.DragButton>
      </St.Header>
      <St.ScrollBox>
        <St.Ul>
          {dialogues &&
            sortArr([...dialogues]).map(
              ({ targetId, target, sourceId, sources, createdAt, message }) => (
                <St.Li
                  key={targetId === idUser ? sourceId + "t" : targetId}
                  onContextMenu={(e) =>
                    contextHandler(e, targetId === idUser ? sourceId : targetId)
                  }
                >
                  <St.LinkFrend
                    $allWind={allWind}
                    $mousUp={mousUp}
                    $drag={drag}
                    $open={id === (targetId === idUser ? sourceId : targetId)}
                    to={
                      targetId === idUser
                        ? `/:${sourceId}_${sources.firstName}_${sources.lastName}`
                        : `/:${targetId}_${target.firstName}_${target.lastName}`
                    }
                  >
                    <St.AvatarBox>
                      {(
                        <Avatar
                          size={30}
                          letter={
                            targetId === idUser
                              ? sources.firstName[0] + sources.lastName[0]
                              : target.firstName[0] + target.lastName[0]
                          }
                          fontSize={16}
                        />
                      ) ?? <St.AvatarImg src={avatar} alt="avatar" />}
                    </St.AvatarBox>
                    <St.Dial>
                      {`${
                        targetId === idUser
                          ? sources.firstName
                          : target.firstName
                      } ${
                        targetId === idUser ? sources.lastName : target.lastName
                      }`}
                    </St.Dial>
                    <St.MessDial>{message && message}</St.MessDial>
                    <St.DateTime>{correctDate(createdAt)}</St.DateTime>
                    <St.DoneAll>
                      <DoneAllIcon sx={{ fontSize: "16px", color: "grey" }} />
                    </St.DoneAll>
                    <St.DragIcon $drag={drag}>
                      <DragIndicatorIcon sx={St.SX.dragIcon} />
                    </St.DragIcon>
                  </St.LinkFrend>
                  <ContextMenu
                    clouseHandler={clouseHandler}
                    user={id ?? 0}
                    open={targetId === idUser ? sourceId : targetId}
                    arrayChild={[
                      Buttons((e: React.MouseEvent<HTMLButtonElement>) =>
                        getAllInfUser(e, id)
                      ).LocalLibrary,
                      Buttons((e: React.MouseEvent<HTMLButtonElement>) =>
                        getAllInfUser(e, id)
                      ).HighlightOff,
                      Buttons((e: React.MouseEvent<HTMLButtonElement>) =>
                        getAllInfUser(e, id)
                      ).DeleteOutline,
                    ]}
                  />
                </St.Li>
              )
            )}
        </St.Ul>
      </St.ScrollBox>
    </St.DialoguesBox>
  );
};

export default Dialogue;
