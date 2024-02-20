import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Sx = { icon: { fontSize: "20px", color: "#ffffff" } };

const Buttons = (onClick: (e: React.MouseEvent<HTMLButtonElement>) => void) => {
  return {
    LocalLibrary: {
      icon: <LocalLibraryOutlinedIcon sx={Sx.icon} />,
      color: "var(--bg-more-inf)",
      title: "more inf",
      duration: "0.5s",
      indexZ: 24,
      onClick: onClick,
    },
    HighlightOff: {
      icon: <HighlightOffIcon sx={Sx.icon} />,
      color: "var(--bg-clear)",
      title: "clear",
      duration: "0.3s",
      indexZ: 25,
      onClick: onClick,
    },
    DeleteOutline: {
      icon: <DeleteOutlineIcon sx={Sx.icon} />,
      color: "var(--bg-delete)",
      title: "delete",
      duration: "0.2s",
      indexZ: 26,
      onClick: onClick,
    },
  };
};

export default Buttons;
