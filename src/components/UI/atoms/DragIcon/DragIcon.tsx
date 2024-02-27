import React from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { St } from "./DragIcon.style";

const DragIcon: React.FC<{ drag: boolean | undefined }> = ({ drag }) => {
  const [open, setOpen] = React.useState<boolean | unknown>(false);

  React.useEffect(() => {
    if (drag) return setOpen(true);

    if (!drag && open)
      new Promise((resolve) => setTimeout(() => resolve(false), 500)).then(
        (res) => setOpen(res)
      );
  }, [drag, open]);

  return (
    <>
      {open ? (
        <St.DragIcon $drag={drag || false}>
          <DragIndicatorIcon sx={{ fontSize: "20px", color: "#000000" }} />
        </St.DragIcon>
      ) : (
        <></>
      )}
    </>
  );
};

export default DragIcon;
