import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import { delDataMoreInfAction } from "../../../../redux/localState/moreInfReducer";
import { InitialStateType } from "../../../../redux/localState/moreInfReducer";
import { St } from "./Modal.style";

export type StyleProp = { $left: string; $top: number; $anim?: boolean };
type PropType = {
  moreInf: InitialStateType;
  component: JSX.Element;
  type?: "right" | "left";
};

const Modal: React.FC<PropType> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const [get, set] = React.useState<boolean>(true);

  const switchProp = (): StyleProp => {
    switch (props.type) {
      case "right":
        return { $left: "79vw", $top: 20 };
      case "left":
        return { $left: "20px", $top: 20 };
      default:
        return { $left: `calc(50vw - 10%)`, $top: 20 };
    }
  };

  const closeHandle = (): (() => void) => {
    set(false);
    const timer = setTimeout((): void => {
      dispatch(delDataMoreInfAction());
      set(true);
    }, 70);
    return (): void => clearTimeout(timer);
  };

  return (
    <>
      {props.moreInf.open ? (
        <>
          <St.BG $anim={get} onClick={closeHandle} />
          <St.Box $anim={get} {...switchProp()}>
            {props.component}
          </St.Box>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
