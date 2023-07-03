import { useEffect, useRef, useState } from "react";

export const useRefresh = () => {
  const refreshCont = useRef<HTMLDivElement>(null);
  const [startPoint, setStartPoint] = useState(0);
  const [pullChange, setPullChange] = useState<number>(0);

  const initLoading = () => {
    refreshCont.current?.classList.add("loading");
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  const pullStart = (e: TouchEvent) => {
    const { screenY } = e.targetTouches[0];
    setStartPoint(screenY);
  };

  const pull = (e: TouchEvent) => {
    const touch = e.targetTouches[0];
    const { screenY } = touch;

    let pullLength = startPoint < screenY ? Math.abs(screenY - startPoint) : 0;
    setPullChange(pullLength);
    // console.log({ screenY, startPoint, pullLength, pullChange });
  };

  const endPull = (_e: TouchEvent) => {
    setStartPoint(0);
    setPullChange(0);
    if (pullChange > 180) initLoading();
  };

  useEffect(() => {
    window.addEventListener("touchstart", pullStart);
    window.addEventListener("touchmove", pull);
    window.addEventListener("touchend", endPull);
    return () => {
      window.removeEventListener("touchstart", pullStart);
      window.removeEventListener("touchmove", pull);
      window.removeEventListener("touchend", endPull);
    };
  }, []);

  return { refreshCont, pullChange };
};
