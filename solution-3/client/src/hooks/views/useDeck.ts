import { useState } from "react";
import { config, SpringValue, useSpring } from "@react-spring/web";

import { useWefa } from "../plants/usePlants";

export const height = window.innerHeight - 24;

export interface DeckDataProps {
  plants: Plant[];
  statsSpring: {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
  };
  tabsSpring: {
    transform: SpringValue<string>;
  };
  tab: DeckTab;
  changeTab: (tab: DeckTab) => void;
}

export type DeckTab = "plants" | "creatures";

export const useDeck = (): DeckDataProps => {
  const [tab, setTab] = useState<DeckTab>("plants");

  const { plants } = useWefa();

  const statsSpring = useSpring({
    from: { opacity: 0, transform: "translate3d(0, -100%, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0%, 0)" },
    config: {
      tension: 270,
      friction: 12,
      clamp: true,
    },
  });

  const tabsSpring = useSpring({
    from: { transform: "translate3d(0, 100%, 0)" },
    to: { transform: "translate3d(0, 0%, 0)" },
    config: {
      ...config.slow,
    },
  });

  function changeTab(tab: DeckTab) {
    setTab(tab);
  }

  return {
    plants,
    statsSpring,
    tabsSpring,
    tab,
    changeTab,
  };
};
