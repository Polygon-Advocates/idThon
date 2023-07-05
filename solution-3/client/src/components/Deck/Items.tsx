import { elementData } from "../../constants";

import { Badge, DeckCard } from "./Card";
import { DeckViewerData } from "./Viewer";

interface DeckItemsProps {
  type: "plants" | "creatures";
  isDesktop: boolean;
  items: Plant[];
  openSheet: ({ data }: { data?: DeckViewerData }) => void;
}

export const DeckItems: React.FC<DeckItemsProps> = ({
  items,
  isDesktop,
  openSheet,
  type,
}) => {
  return (
    <ul
      className={
        isDesktop
          ? "grid grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] px-6 sm:px-12 overflow-auto gap-6 pb-32 pt-6 h-full"
          : "flex flex-col overflow-scroll h-full gap-3 pb-20"
      }
      // className={`grid grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] px-6 sm:px-12 overflow-scroll h-full`}
    >
      {items.map((item, index) => {
        const badges: Badge[] = [];

        item.edible_parts?.length &&
          badges.push({ name: "Edible", color: "#15803d" });
        item.structured_name?.species &&
          badges.push({
            name: item.structured_name.species,
          });
        item.structured_name?.genus &&
          badges.push({
            name: item.structured_name.genus,
          });
        // Watering

        return (
          <DeckCard
            {...item}
            key={item.id}
            paddingTop={index === 0}
            onClick={() =>
              openSheet({
                data: {
                  ...item,
                  type: type === "plants" ? "plant" : "creature",
                  actions: [],
                  badges,
                },
              })
            }
            isDesktop={isDesktop}
            badges={badges}
            actions={[]}
          />
        );
      })}
    </ul>
  );
};
