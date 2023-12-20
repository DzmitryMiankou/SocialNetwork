import React from "react";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = React.useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const [sizeWind, setSizeWind] = React.useState<number>(window.innerWidth);

  React.useEffect(() => {
    const updateSize = (): void => {
      setSizeWind(window.innerWidth);
    };
    window.addEventListener("resize", updateSize);
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    if (mousePosition.x < 380)
      return setMousePosition({ ...mousePosition, x: 380 });

    if (mousePosition.x > sizeWind - 340)
      return setMousePosition({ ...mousePosition, x: sizeWind - 340 });

    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [mousePosition, sizeWind]);
  return mousePosition;
};
export default useMousePosition;
