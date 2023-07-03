import React from "react";
import { createPortal } from "react-dom";
import { BottomSheet } from "react-spring-bottom-sheet";

import { DeckCardData } from "./Card";
import { useApp } from "../../hooks/app/useApp";

export interface DeckViewerData extends DeckCardData {
  type: "creature" | "plant";
}

export interface DeckViewerProps extends DeckViewerData {
  open: boolean;
  onDismiss: () => void;
}

export const DeckViewer: React.FC<DeckViewerProps> = ({
  name,
  description,
  image,
  badges,
  // type,
  // actions,
  // element,
  open,
  onDismiss,
}) => {
  const { isDesktop } = useApp();

  const Content = () => (
    <div className="px-4 flex flex-col gap-3 pb-12 w-full bg-base-100">
      <img
        src={image}
        alt={name}
        className="w-full aspect-square object-cover rounded-xl"
      />
      <h2 className="font-bold text-2xl capitalize">{name}</h2>
      <div className="flex gap-3">
        {badges?.map(({ name, color, Icon }) => (
          <div
            key={name}
            style={{
              background: color ? color : undefined,
              borderColor: color ? color : undefined,
            }}
            className={`flex badge badge-lg md:badge-lg capitalize text-base-100 ${
              color ? `bg-[${color}]` : "badge-secondary"
            } max-w-32 line-clamp-1`}
          >
            {Icon && <Icon className="w-4 h-4 fill-base-100" />}
            {name}
          </div>
        ))}
      </div>
      {description && <p className="font-light">{description}</p>}
    </div>
  );

  if (isDesktop) {
    return createPortal(
      <>
        <input
          type="checkbox"
          id="deck-viewer-dialog"
          className="modal-toggle"
        />
        <label htmlFor="deck-viewer-dialog" className="modal cursor-pointer">
          <label
            className="modal-box relative flex w-full max-w-sm flex-col gap-4"
            htmlFor=""
          >
            <Content />
          </label>
        </label>
      </>,
      document.body
    );
  }

  return (
    <BottomSheet
      className="z-20 fixed bg-base-100"
      open={open}
      onDismiss={onDismiss}
      scrollLocking
      defaultSnap={({ maxHeight }) => maxHeight * 0.76}
      snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight * 0.76]}
    >
      <Content />
    </BottomSheet>
  );
};
