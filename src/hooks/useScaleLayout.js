import { useEffect, useRef, useState } from "react";

export const useScaleLayout = (baseWidth = 500) => {
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const updateScale = () => {
      const ratio = Math.min(window.innerWidth / baseWidth, 1);
      setScale(ratio);
      if (ref.current) {
        const contentHeight = ref.current.offsetHeight;
        setHeight(contentHeight * ratio);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [baseWidth]);

  return { scale, height, ref };
};
