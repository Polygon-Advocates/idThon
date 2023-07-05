import React from "react";
import { a, config, useSpring } from "@react-spring/web";

import { useApp } from "../../hooks/app/useApp";

interface PlantErrorProps {
  message?: string;
}

export const PlantError: React.FC<PlantErrorProps> = ({ message }) => {
  const { isDesktop } = useApp();

  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      ...config.default,
      clamp: true,
    },
  });

  return (
    <a.div
      className={`bg-base-100 p-2 shadow-xl rounded-xl absolute bottom-2 left-2 w-5/6 flex flex-col transition-all ${
        isDesktop ? "" : ""
      }`}
      style={spring}
    >
      <h4 className="text-base text-error font-semibold">Error</h4>
      <p className="line-clamp-2 text-sm font-light">
        {message ?? "Error detecting plant, try again"}
      </p>
    </a.div>
  );
};
