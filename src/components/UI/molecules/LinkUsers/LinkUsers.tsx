import React from "react";
import { St } from "./LinkUsers.style";
import avatar from "../../../../img/images.png";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DragIcon from "../../atoms/DragIcon/DragIcon";
import AvatarBox from "../../molecules/AvatarBox/AvatarBox";

type PropType = {
  mousUp?: boolean;
  padding?: string;
  title: string;
  letter: string;
  message?: string | undefined;
  to: string;
  drag?: boolean;
  open: boolean;
  date?: string;
  sizeImg: number;
  fontSize: number;
  countEl: number;
  gridArea: string;
};

const LinkUsers: React.FC<PropType> = (props) => {
  const gridColumns = "40px auto 0.2fr min-content";

  const LinkProps = {
    $countEl: props.countEl,
    $mousUp: props.mousUp,
    $gridColumns: props.drag ? gridColumns + " 10px" : gridColumns,
    $gridArea: props.gridArea,
    $drag: props.drag,
    $open: props.open,
    to: props.to,
  };
  const Props = {
    LinkProps: props.padding
      ? {
          $padding: props.padding,
          ...LinkProps,
        }
      : {
          ...LinkProps,
          $padding: "10px 0px",
        },
    AvatarProps: {
      size: props.sizeImg,
      letter: props.letter,
      fontSize: props.fontSize,
      src: avatar,
    },
  };

  return (
    <St.LinkFriend {...Props.LinkProps}>
      <AvatarBox {...Props.AvatarProps} />
      <St.Dial>{props.title}</St.Dial>
      <St.MessDial>{props.message}</St.MessDial>
      <>{props.date && <St.DateTime>{props.date}</St.DateTime>}</>
      <>
        {props.message && (
          <St.DoneAll>
            <DoneAllIcon sx={St.SX.icon} />
          </St.DoneAll>
        )}
      </>
      <>{props.drag && <DragIcon drag={props.drag} />}</>
    </St.LinkFriend>
  );
};

export default LinkUsers;
