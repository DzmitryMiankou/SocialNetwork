import React from "react";

type initialProps = { bool: boolean; time?: number };

const useBooleanTimer = ({
  bool = false,
  time = 500,
}: initialProps): boolean => {
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    bool ? setOpen(true) : (timer = setTimeout(() => setOpen(false), time));

    return () => clearTimeout(timer);
  }, [bool, time]);

  return open;
};

export default useBooleanTimer;
