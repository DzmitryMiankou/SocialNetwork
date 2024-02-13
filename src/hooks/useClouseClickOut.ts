import React from "react";

type RefType = HTMLDivElement | null;

const useClouseClickOut = ({
  clouseHandler,
}: {
  clouseHandler: () => void;
}): { ref: React.MutableRefObject<RefType> } => {
  const wrapperRef = React.useRef<RefType>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      )
        if (clouseHandler) return clouseHandler();
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [clouseHandler, wrapperRef]);

  return { ref: wrapperRef };
};
export default useClouseClickOut;
