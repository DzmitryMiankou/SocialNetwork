import React from "react";

interface PercentagePosition {
  percentageX: number;
  mirrPercentageX: number;
}

interface prop {
  mouse: boolean;
  initial: number;
}

const useMousePosition = ({ mouse, initial }: prop): PercentagePosition => {
  const [sizeWind, setSizeWind] = React.useState<number>(window.innerWidth);

  const [percentagePosition, setPercentagePosition] =
    React.useState<PercentagePosition>({
      percentageX: initial,
      mirrPercentageX: 100 - initial,
    });

  React.useEffect(() => {
    const updateSize = (): void => setSizeWind(window.innerWidth);
    window.addEventListener("resize", updateSize);

    const updateMousePosition = (ev: MouseEvent) => {
      if (mouse === true)
        return setPercentagePosition({
          percentageX: +((ev.clientX / sizeWind) * 100).toFixed(2),
          mirrPercentageX: +(100 - (ev.clientX / sizeWind) * 100).toFixed(2),
        });

      if (mouse === false)
        return setPercentagePosition({ ...percentagePosition });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [mouse, percentagePosition, sizeWind]);
  return { ...percentagePosition };
};
export default useMousePosition;
