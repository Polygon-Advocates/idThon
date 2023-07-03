import React from "react";
import { a, config, useSpring } from "@react-spring/web";

export const Loader: React.FC = () => {
  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { ...config.default, clamp: true },
  });

  return (
    <a.div className="relative h-12 w-12" style={spring}>
      <div
        className="dot bg-blue-500"
        style={{
          top: "50%",
          left: "0%",
          animationDelay: "0s",
        }}
      />
      <div
        className="dot bg-emerald-800"
        style={{
          top: "0%",
          left: "50%",
          animationDelay: "0.25s",
        }}
      />
      <div
        className="dot bg-red-500"
        style={{
          top: "50%",
          left: "100%",
          animationDelay: "0.5s",
        }}
      />
      <div
        className="dot bg-amber-400"
        style={{
          top: "100%",
          left: "50%",
          animationDelay: "0.75s",
        }}
      />
    </a.div>
  );
};
