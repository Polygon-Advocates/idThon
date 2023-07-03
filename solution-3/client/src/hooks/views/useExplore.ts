import React, { useState } from "react";

import { SeedDataProps, useSeed } from "../wefa/useSeed";

// import { useWorlds } from "../openar/useWorlds";

export interface ExploreDataProps extends SeedDataProps {
  // worlds: any[];
  selectedWorld: string;
  setSelectedWorld: React.Dispatch<React.SetStateAction<string>>;
  // onCreateWorld: any;
  // handleWorldSubmit: any
}

export const useExplore = (): ExploreDataProps => {
  const [selectedWorld, setSelectedWorld] = useState("");
  const seed = useSeed();

  // const { worlds, onCreateWorld, handleWorldSubmit } = useWorlds();

  // const worldList: Record<string, any> = {};

  // worlds.forEach((world) => {
  //   worldList[world.value] = {};
  // });

  // console.log("Explore Data", { worlds, onCreateWorld, handleWorldSubmit });

  return {
    // worlds,
    selectedWorld,
    setSelectedWorld,
    // onCreateWorld,
    // handleWorldSubmit,
    ...seed,
  };
};
