import React from "react";
import { a, config, useSpring } from "@react-spring/web";

export const ErrorPage: React.FC = () => {
  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { ...config.default, clamp: true },
  });

  return (
    <a.div className="grid place-items-center w-full h-full" style={spring}>
      <div>
        <h1 className="text-6xl font-bold text-center text-gray-900">
          Something went wrong, Please refresh the page.
        </h1>
      </div>
    </a.div>
  );
};
