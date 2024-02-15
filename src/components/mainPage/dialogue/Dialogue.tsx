import React from "react";
import { St } from "./Dialogue.style";
import avatar from "../../../img/images.png";
import Modal from "../../alert/Alert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Avatar from "../../avatar/Avatar";
import { LogInitialStateType } from "../../../redux/localState/loginReducer";
import { DialoguesType } from "../../../redux/api/socket/socket.interface";

type PropType = {
  mousUp: boolean;
  allWind: boolean;
  dialogues: DialoguesType[] | undefined;
  user: LogInitialStateType;
};

const Dialogue: React.FC<PropType> = ({ mousUp, allWind, dialogues, user }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [id, setId] = React.useState<number>();

  const contextHandler = (
    e: React.MouseEvent<HTMLElement>,
    id: number
  ): void => {
    e.preventDefault();
    setOpen(true);
    setId(id);
  };

  const clouseHandler = (): void => setOpen(false);

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

  return (
    <St.PosterBox>
      <header>
        <St.H3 $allWind={allWind}>Dialogue</St.H3>
      </header>
      <St.ScrollBox>
        <St.Ul>
          {dialogues &&
            sortArr([...dialogues]).map(
              ({ targetId, target, sourceId, sources, createdAt }) => (
                <St.Li
                  key={targetId === idUser ? sourceId + "t" : targetId}
                  onContextMenu={(e) =>
                    contextHandler(e, targetId === idUser ? sourceId : targetId)
                  }
                >
                  <St.LinkFrend
                    $allWind={allWind}
                    $mousUp={mousUp}
                    to={
                      targetId === idUser
                        ? `/:${sourceId}_${sources.firstName}_${sources.lastName}`
                        : `/:${targetId}_${target.firstName}_${target.lastName}`
                    }
                  >
                    <>
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
                    </>
                    <St.Dial>
                      {`${
                        targetId === idUser
                          ? sources.firstName
                          : target.firstName
                      } ${
                        targetId === idUser ? sources.lastName : target.lastName
                      }`}
                    </St.Dial>
                    <St.DateTime>{correctDate(createdAt)}</St.DateTime>
                  </St.LinkFrend>
                  <Modal
                    open={open}
                    num={id}
                    n={targetId === idUser ? sourceId : targetId}
                    clouseHandler={clouseHandler}
                    component={
                      <St.ModCom>
                        {[
                          <HighlightOffIcon sx={St.SX.icon} />,
                          <DeleteOutlineIcon sx={St.SX.icon} />,
                        ].map((icon, i) => (
                          <St.Butt key={i + "-iconDialogue"}>{icon}</St.Butt>
                        ))}
                      </St.ModCom>
                    }
                  />
                </St.Li>
              )
            )}
        </St.Ul>
      </St.ScrollBox>
    </St.PosterBox>
  );
};

export default Dialogue;
