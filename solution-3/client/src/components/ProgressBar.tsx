import React from "react";
import { a, config, useSpring } from "@react-spring/web";

type ProgressBarSize = "small" | "medium" | "large";

interface ProgressBarProps {
  size?: ProgressBarSize;
  color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = (
  {
    // size = "medium",
    // color,
  }
) => {
  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { ...config.default, clamp: true },
  });

  return (
    <a.div className="line-loader h-full" style={spring}>
      <div className="line-loader-bar bg-secondary h-1" />
    </a.div>
  );
};
