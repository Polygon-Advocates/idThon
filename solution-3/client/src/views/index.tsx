import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { a, useTransition } from "@react-spring/web";

import { useApp } from "../hooks/app/useApp";
import { useDeck } from "../hooks/views/useDeck";
import { useExplore } from "../hooks/views/useExplore";

import Deck from "./Deck";
import Explore from "./Explore";

type LowerElement = "water" | "earth" | "fire" | "air";

export default function Views() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const transitions = useTransition(location, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      tension: 300,
      friction: 20,
      clamp: true,
    },
  });

  const { isDesktop, setTheme } = useApp();

  const deck = useDeck();
  const explore = useExplore();

  useEffect(() => {
    const element = searchParams.get("element") as LowerElement | null;

    if (element) {
      setTheme(element);
    }

    if (isDesktop) {
      toast.info("Use on mobile for best experience.");
    }
  }, []);

  return transitions((style, location) => (
    <a.main
      className={`flex h-[calc(100dvh-4rem)] overflow-hidden max-h-[calc(100dvh-4rem)] ${
        isDesktop ? "" : "overflow-y-contain"
      }`}
      style={style}
    >
      <Routes location={location}>
        <Route path="/deck" element={<Deck {...deck} />} />
        <Route path="/explore" element={<Explore {...explore} />} />
        <Route path="*" element={<Navigate to="/explore" />} />
      </Routes>
    </a.main>
  ));
}
