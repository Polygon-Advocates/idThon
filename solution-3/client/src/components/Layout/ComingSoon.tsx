import React from "react";
import { a, config, useSpring } from "@react-spring/web";

export const ComingSoon: React.FC = () => {
  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { ...config.default, clamp: true },
  });

  return (
    <a.div className="grid place-items-center w-screen h-screen" style={spring}>
      <h1 className="text-6xl font-bold text-center text-gray-900">
        Coming Soon
      </h1>
    </a.div>
  );
};
