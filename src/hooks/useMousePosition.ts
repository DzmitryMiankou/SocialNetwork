import React from "react";

interface UseMousePosition {
  x: number;
  y: number;
}

interface PercentagePosition {
  percentageX: number;
  mirrPercentageX: number;
}

interface ReturnUseMousePosition {
  mousePosition: PercentagePosition;
}

const useMousePosition = ({
  mouse,
  initial,
  boarder,
}: {
  mouse: boolean;
  initial: number;
  boarder: number;
}): ReturnUseMousePosition => {
  const [mousePosition, setMousePosition] = React.useState<UseMousePosition>({
    x: (initial / 100) * window.innerWidth,
    y: 0,
  });
  const [sizeWind, setSizeWind] = React.useState<number>(window.innerWidth);

  const [percentagePosition, setPercentagePosition] =
    React.useState<PercentagePosition>({
      percentageX: initial,
      mirrPercentageX: 100 - initial,
    });

  const num = boarder;

  React.useEffect(() => {
    const updateSize = (): void => setSizeWind(window.innerWidth);

    window.addEventListener("resize", updateSize);
    const updateMousePosition = (ev: MouseEvent) => {
      if (mouse === true) {
        setMousePosition({ x: ev.clientX, y: ev.clientY });
        setPercentagePosition({
          percentageX: +((mousePosition.x / sizeWind) * 100).toFixed(2),
          mirrPercentageX: +(100 - (mousePosition.x / sizeWind) * 100).toFixed(
            2
          ),
        });
      }

      if (mouse === false)
        return setPercentagePosition({ ...percentagePosition });
    };

    if (percentagePosition.percentageX < num)
      return setPercentagePosition({
        percentageX: num,
        mirrPercentageX: 100 - num,
      });

    if (percentagePosition.percentageX > 100 - num)
      return setPercentagePosition({
        percentageX: 100 - num,
        mirrPercentageX: num,
      });

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [boarder, mouse, mousePosition.x, num, percentagePosition, sizeWind]);
  return { mousePosition: { ...percentagePosition } };
};
export default useMousePosition;
