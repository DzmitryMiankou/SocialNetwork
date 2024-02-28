import React from "react";

type initialProps = { bool: boolean; delay?: number };

const useBooleanTimer = ({
  bool = false,
  delay = 500,
}: initialProps): boolean => {
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect((): (() => void) => {
    let timer: NodeJS.Timeout;
    bool
      ? setOpen(true)
      : (timer = setTimeout((): void => setOpen(false), delay));

    return () => clearTimeout(timer);
  }, [bool, delay]);

  return open;
};

export default useBooleanTimer;
