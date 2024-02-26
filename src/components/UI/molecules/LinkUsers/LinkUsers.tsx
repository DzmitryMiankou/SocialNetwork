import React from "react";
import { St } from "./LinkUsers.style";
import avatar from "../../../../img/images.png";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DragIcon from "../../atoms/DragIcon/DragIcon";
import AvatarBox from "../../molecules/AvatarBox/AvatarBox";

type PropType = {
  style: typeof St.DefStyle;
  mousUp?: boolean;
  title: string;
  letter: string;
  message?: string;
  to: string;
  drag?: boolean;
  open: boolean;
  date?: string;
  countEl: number;
};

const LinkUsers: React.FC<PropType> = (props) => {
  const Props = {
    LinkProps: {
      $countEl: props.countEl,
      $mousUp: props.mousUp,
      $gridColumns: props.style.gridColumns,
      $gridArea: props.style.gridArea,
      $drag: props.drag,
      $open: props.open,
      to: props.to,
      $padding: props.style.padding || St.DefStyle.padding,
    },
    AvatarProps: {
      size: props.style.sizeImg || St.DefStyle.sizeImg,
      letter: props.letter,
      fontSize: props.style.fontSize || St.DefStyle.fontSize,
      src: avatar,
    },
  };

  return (
    <St.LinkFriend {...Props.LinkProps}>
      <AvatarBox {...Props.AvatarProps} />
      <St.Dial>{props.title}</St.Dial>
      <St.MessDial>{props.message}</St.MessDial>
      <>{props.date ? <St.DateTime>{props.date}</St.DateTime> : <></>}</>
      <>
        {props.message ? (
          <St.DoneAll>
            <DoneAllIcon sx={St.SX.icon} />
          </St.DoneAll>
        ) : (
          <></>
        )}
      </>
      <DragIcon drag={props.drag ?? false} />
    </St.LinkFriend>
  );
};

export default LinkUsers;
