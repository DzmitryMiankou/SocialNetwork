import React from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { St } from "./DragIcon.style";

const DragIcon: React.FC<{ drag: boolean | undefined }> = ({
  drag = false,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (drag) return setOpen(true);
    if (!drag && open) timer = setTimeout(() => setOpen(false), 500);

    return () => clearTimeout(timer);
  }, [drag, open]);

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
