import { useEffect, useState } from "react";
import { a } from "@react-spring/web";

import { useApp } from "../../hooks/app/useApp";
import { useWefa } from "../../hooks/plants/usePlants";
import { DeckDataProps, DeckTab } from "../../hooks/views/useDeck";

import { DeckItems } from "../../components/Deck/Items";
import { DeckStats } from "../../components/Deck/Stats";
import { DeckViewer, DeckViewerData } from "../../components/Deck/Viewer";

const tabs: DeckTab[] = ["plants", "creatures"];

interface DeckProps extends DeckDataProps {}

const Deck: React.FC<DeckProps> = ({
  tab,
  changeTab,
  plants,
  creatures,
  statsSpring,
  tabsSpring,
}) => {
  const { isDesktop } = useApp();
  const { energy, handleFetchEnergy } = useWefa();

  const [viewerOpen, setViewerOpen] = useState(false);
  const [sheetData, setSheetData] = useState<DeckViewerData>({
    name: "",
    description: "",
    image: "",
    type: "creature",
    actions: [],
    badges: [],
  });

  function openSheet({ data }: { data?: DeckViewerData }) {
    data && setSheetData(data);
    setViewerOpen(true);
  }

  function closeSheet() {
    setViewerOpen(false);
  }

  useEffect(() => {
    handleFetchEnergy();
  }, []);

  return (
    <section
      className={`overflow-hidden ${
        isDesktop ? "bg-inherit" : "bg-primary"
      } deck-view flex-col justify-center`}
    >
      <a.div className="deck-stats sm:px-6 px-3 w-full" style={statsSpring}>
        <DeckStats energy={energy} />
      </a.div>
      <a.div
        style={tabsSpring}
        className="deck-tabs relative flex flex-col rounded-t-3xl w-full px-6 bg-base-100 shadow-xl"
      >
        <div
          className={`${
            isDesktop ? "-top-24 left-6" : "top-3 left-3"
          } absolute tabs tabs-boxed rounded-xl w-fit z-10`}
        >
          {tabs.map((name) => (
            <button
              key={name}
              className={`tab capitalize w-20 ${
                name === tab ? "tab-active" : ""
              }`}
              onClick={() => changeTab(name)}
              type="button"
            >
              {name}
            </button>
          ))}
        </div>
        <div className="h-full">
          {tab === "plants" && (
            <DeckItems
              type={tab}
              isDesktop={isDesktop}
              items={plants}
              openSheet={openSheet}
            />
          )}
          {tab === "creatures" && (
            <DeckItems
              type={tab}
              isDesktop={isDesktop}
              items={creatures}
              openSheet={openSheet}
            />
          )}
        </div>
      </a.div>
      <DeckViewer {...sheetData} open={viewerOpen} onDismiss={closeSheet} />
    </section>
  );
};

export default Deck;
