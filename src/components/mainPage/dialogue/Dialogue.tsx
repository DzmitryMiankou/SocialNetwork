import React from "react";
import { St } from "./Dialogue.style";
import avatar from "../../../img/images.png";
import Modal from "../../alert/Alert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Avatar from "../../avatar/Avatar";
import { LogInitialStateType } from "../../../redux/localState/loginReducer";
import { DialoguesType } from "../../../redux/api/socket/socket.interface";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";

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
                    <Modal
                      open={open}
                      num={id}
                      n={targetId === idUser ? sourceId : targetId}
                      clouseHandler={clouseHandler}
                      component={
                        <St.ModCom>
                          {[
                            {
                              icon: (
                                <LocalLibraryOutlinedIcon sx={St.SX.icon} />
                              ),
                              color: "var(--bg-more-inf)",
                              title: "more inf",
                              duration: "0.5s",
                              indexZ: 24,
                            },
                            {
                              icon: <HighlightOffIcon sx={St.SX.icon} />,
                              color: "var(--bg-clear)",
                              title: "clear",
                              duration: "0.3s",
                              indexZ: 25,
                            },
                            {
                              icon: <DeleteOutlineIcon sx={St.SX.icon} />,
                              color: "var(--bg-delete)",
                              title: "delete",
                              duration: "0.2s",
                              indexZ: 26,
                            },
                          ].map(
                            ({ icon, color, title, duration, indexZ }, i) => (
                              <St.Butt
                                $bg={color}
                                key={i + "-iconDialogue"}
                                $duration={duration}
                                $indexZ={indexZ}
                                $countEl={i}
                              >
                                {icon}
                                <p style={{ color: "white" }}>{title}</p>
                              </St.Butt>
                            )
                          )}
                        </St.ModCom>
                      }
                    />
                  </St.LinkFrend>
                </St.Li>
              )
            )}
        </St.Ul>
      </St.ScrollBox>
    </St.PosterBox>
  );
};

export default Dialogue;
