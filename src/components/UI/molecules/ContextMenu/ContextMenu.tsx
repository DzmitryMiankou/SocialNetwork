import React from "react";
import ContextMenuBox from "../../atoms/ContextMenuBox/ContextMenuBox";
import ContextMenuButton, {
  ButtonsType,
} from "../../atoms/ContextMenuButton/ContextMenuButton";

type Props = {
  arrayChild: ButtonsType[];
  open: number;
  user: number;
  clouseHandler: () => void;
};

const ContextMenu: React.FC<Props> = (props) => {
  const contextMenuBoxProps = {
    num: props.user,
    n: props.open,
    clouseHandler: props.clouseHandler,
  };

  return (
    <ContextMenuBox
      {...contextMenuBoxProps}
      component={
        <>
          {props.arrayChild.map(
            ({ icon, color, title, duration, indexZ, onClick }, i) => (
              <ContextMenuButton
                color={color}
                key={i + "-iconDialogue"}
                duration={duration}
                onClick={onClick}
                open={props.user === props.open}
                indexZ={indexZ}
                countEl={i}
                title={title}
                icon={icon}
              />
            )
          )}
        </>
      }
    />
  );
};

export default ContextMenu;
