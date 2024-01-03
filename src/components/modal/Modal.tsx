import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { delDataMoreInfAction } from "../../redux/moreInfReducer";
import { InitialStateType } from "../../redux/moreInfReducer";

type StyleProp = { $left: string; $top: number };

const Box = styled.div<StyleProp>`
  width: 20%;
  min-width: 250px;
  height: 90vh;
  position: absolute;
  background: #ddad7e;
  top: ${(prop) => prop.$top + "px"};
  left: ${(prop) => prop.$left};
  z-index: 99;
`;

const BG = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  background: #3d2c21b5;
  top: 0;
  z-index: 98;
  backdrop-filter: blur(2px);
  left: 0;
`;

type PropType = {
  moreInf: InitialStateType;
  component: JSX.Element;
  type?: "right" | "left";
};

const Modal: React.FC<PropType> = (props) => {
  const dispatch: AppDispatch = useDispatch();

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

  return (
    <>
      {props.moreInf.open ? (
        <>
          <BG onClick={() => dispatch(delDataMoreInfAction())} />
          <Box {...switchProp()}>{props.component}</Box>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
