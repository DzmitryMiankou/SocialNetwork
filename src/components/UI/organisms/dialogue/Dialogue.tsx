import React from "react";
import { St } from "./Dialogue.style";
import { LogInitialStateType } from "../../../../redux/localState/loginReducer";
import { DialoguesType } from "../../../../redux/api/socket/socket.interface";
import { AppDispatch } from "../../../../redux/store";
import { useDispatch } from "react-redux";
import { setDataMoreInfAction } from "../../../../redux/localState/moreInfReducer";
import Buttons from "../../atoms/Buttons/Buttons";
import ContextMenu from "../../molecules/ContextMenu/ContextMenu";
import TitleBlock from "../../atoms/TitleBlock/TitleBlock";
import LinkUsers from "../../molecules/LinkUsers/LinkUsers";
import { useDeleteMessagesMutation } from "../../../../redux/api/socket/messages/messagesReducer";

type PropType = {
  mousUp: boolean;
  allWind: boolean;
  dialogues: DialoguesType[] | undefined;
  user: LogInitialStateType;
};

type DateOptionType = Intl.DateTimeFormatOptions;

type OptionDateType<T extends Intl.DateTimeFormatOptions> = {
  year: T;
  hour: T;
  weekday: T;
  yearDayMonth: T;
};

const gridAreas = "ava dial done time";
const gridAreasDown = "ava message . .";

const optionDate: OptionDateType<DateOptionType> = {
  year: { year: "numeric" },
  hour: { hour: "2-digit", minute: "2-digit", hour12: false },
  weekday: { weekday: "short" },
  yearDayMonth: { year: "numeric", day: "numeric", month: "numeric" },
};

const correctDate = (date: string): string => {
  const dialDate = new Date(date);
  const nowDate = new Date();

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

const Dialogue: React.FC<PropType> = ({ mousUp, allWind, dialogues, user }) => {
  const [setContact] = useDeleteMessagesMutation();
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
  const gridColumns = "40px auto 0.2fr min-content";
  const clouseHandler = () => setId(0);

  const idUser = user?.user?.id;

  const getAllInfUser = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number | undefined
  ): void => {
    e.preventDefault();
    dispatch(setDataMoreInfAction(id ?? 0));
  };

  const deleteMessages = (targetId: number, sourceId: number) => {
    setContact({ targetId: targetId, sourceId: sourceId });
  };

  return (
    <St.DialoguesBox>
      <St.Header $allWind={allWind}>
        <TitleBlock text="Dialogue" />
        <St.DragButton
          $color={drag ? "#107900" : "#7e664b"}
          $hoverColor={!drag ? "#107900" : "#7e664b"}
          onClick={dragHandler}
          type="button"
        >
          change
        </St.DragButton>
      </St.Header>
      <St.ScrollBox>
        <St.Ul>
          {dialogues &&
            sortArr([...dialogues]).map(
              (
                { targetId, target, sourceId, sources, createdAt, message },
                i
              ) => (
                <St.Li
                  key={targetId === idUser ? sourceId + "t" : targetId}
                  onContextMenu={(e) =>
                    contextHandler(e, targetId === idUser ? sourceId : targetId)
                  }
                >
                  <LinkUsers
                    style={{
                      gridColumns: drag ? gridColumns + " 10px" : gridColumns,
                      padding: allWind ? "10px 20px" : "10px 40px",
                      fontSize: 16,
                      sizeImg: 30,
                      gridArea: drag
                        ? `'${gridAreas + " drag"}'
                          '${gridAreasDown + " ."}'`
                        : `'${gridAreas}'
                          '${gridAreasDown}'`,
                    }}
                    letter={
                      targetId === idUser
                        ? sources.firstName[0] + sources.lastName[0]
                        : target.firstName[0] + target.lastName[0]
                    }
                    countEl={3}
                    mousUp={mousUp}
                    drag={drag}
                    message={message && message}
                    date={correctDate(createdAt)}
                    open={id === (targetId === idUser ? sourceId : targetId)}
                    to={
                      targetId === idUser
                        ? `/:${sourceId}_${sources.firstName}_${sources.lastName}`
                        : `/:${targetId}_${target.firstName}_${target.lastName}`
                    }
                    title={`${
                      targetId === idUser ? sources.firstName : target.firstName
                    } ${
                      targetId === idUser ? sources.lastName : target.lastName
                    }`}
                  />
                  <ContextMenu
                    clouseHandler={clouseHandler}
                    user={id ?? 0}
                    open={targetId === idUser ? sourceId : targetId}
                    arrayChild={[
                      Buttons((e: React.MouseEvent<HTMLButtonElement>) =>
                        getAllInfUser(e, id)
                      ).LocalLibrary,
                      Buttons((e: React.MouseEvent<HTMLButtonElement>) =>
                        deleteMessages(targetId, sourceId)
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
