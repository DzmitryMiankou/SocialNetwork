import React from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { St } from "./DragIcon.style";
import useBooleanTimer from "../../../../hooks/useBooleanTimer";

const DragIcon: React.FC<{ drag: boolean | undefined }> = ({
  drag = false,
}) => {
  const open = useBooleanTimer({ bool: drag, time: 500 });

  return (
    <>
      {open ? (
        <St.DragIcon $drag={drag}>
          <DragIndicatorIcon sx={{ fontSize: "20px", color: "#000000" }} />
        </St.DragIcon>
      ) : (
        <></>
      )}
    </>
  );
};

export default DragIcon;
