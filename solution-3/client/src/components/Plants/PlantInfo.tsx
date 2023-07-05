import React from "react";
import { a, config, useSpring } from "@react-spring/web";

import { useApp } from "../../hooks/app/useApp";

interface PlantInfoProps extends PlantDetails {}

export const PlantInfo: React.FC<PlantInfoProps> = ({
  common_names,
  scientific_name,
  // edible_parts,
  // id,
  // description,
  // type,
  // zone,
}) => {
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
      className={`bg-base-100 p-2 border-success bprder-1 shadow-xl rounded-xl absolute bottom-2 left-2 w-5/6 flex flex-col transition-all ${
        isDesktop ? "" : ""
      }`}
      style={spring}
    >
      <h4 className="line-clamp-1 text-base">
        <span className="font-semibold capitalize">{common_names[0]}</span>{" "}
        <span className="text-success">Detected</span>
      </h4>
      <p className="line-clamp-1 text-sm font-light">{scientific_name}</p>
      {/* <div className="flex gap-3">
        <span className="badge badge-primary">{type}</span>
        <span className="badge badge-secondary">{zone}</span>
      </div> */}
    </a.div>
  );
};
