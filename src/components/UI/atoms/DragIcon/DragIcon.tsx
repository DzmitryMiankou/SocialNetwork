import React from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { St } from "./DragIcon.style";

const DragIcon: React.FC<{ drag: boolean }> = ({ drag }) => {
  return (
    <St.DragIcon $drag={drag}>
      <DragIndicatorIcon sx={{ fontSize: "20px", color: "#000000" }} />
    </St.DragIcon>
  );
};

export default DragIcon;
