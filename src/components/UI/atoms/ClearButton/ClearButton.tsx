import React from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { St } from "./ClearButton.style";

type Props = {
  clouseHandler: () => void;
};

const ClearButton: React.FC<Props> = (props) => {
  return (
    <St.InputButton onClick={props.clouseHandler} type="button">
      <ClearRoundedIcon sx={St.SX().icon} />
    </St.InputButton>
  );
};

export default ClearButton;
