import React from "react";

import SunIcon from "../../assets/badges/sun-100.png";

interface DeckStatsProps {
  energy?: number;
}

export const DeckStats: React.FC<DeckStatsProps> = ({ energy }) => {
  return (
    <div className="flex items-center py-2 rounded-xl w-full h-full">
      {/* <div className="badge absolute right-3 top-2">LVL 33</div> */}
      <div className="placeholder avatar">
        <div className="w-20 rounded-full bg-base-100">
          {/* <span className="text-xl">JO</span> */}
          <img src={SunIcon} alt="deck image" />
        </div>
      </div>
      <div className="flex text-primary items-center gap-2 -ml-3 px-4 bg-base-100 py-1 justify-between flex-1 rounded-xl">
        <h3 className="text-xl font-bold">Energy</h3>
        <p className="text-xl font-semibold">{energy ?? 0}</p>
      </div>
    </div>
  );
};
