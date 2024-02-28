import React from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { St } from "./DragIcon.style";
import useBooleanTimer from "../../../../hooks/useBooleanTimer";

const DragIcon: React.FC<{ drag: boolean | undefined }> = ({
  drag = false,
}) => {
  const [grabb, setGrabb] = React.useState<boolean>(false);
  const open = useBooleanTimer({ bool: drag, delay: 500 });

  return (
    <>
      {open ? (
        <St.DragIcon
          $open={drag}
          $cursor={grabb}
          onMouseDown={() => setGrabb(true)}
          onMouseUp={() => setGrabb(false)}
        >
          <DragIndicatorIcon sx={{ fontSize: "20px", color: "#000000" }} />
        </St.DragIcon>
      ) : (
        <></>
      )}
    </>
  );
};

export default DragIcon;
