import React from "react";

import { Loader } from "../Loader";
import { PlantError } from "./PlantError";

interface CreatureGenerationProps {
  error: string | null;
  creature: Creature | null;
  generating: boolean;
  onReset: () => void;
}

export const CreatureGeneration: React.FC<CreatureGenerationProps> = ({
  error,
  creature,
  generating,
  onReset,
}) => {
  if (generating || !creature)
    return (
      <div className="grid h-full w-full place-items-center">
        <Loader />
      </div>
    );

  return (
    <>
      <img
        src={creature.image}
        alt="creature"
        className="aspect-square overflow-hidden rounded-lg object-cover"
      />
      <div className="flex w-full gap-2 px-1">
        {/* <button className="btn flex-1">Nurture</button> */}
        <button className="btn flex-1 btn-primary" onClick={onReset}>
          Reset
        </button>
      </div>
      {error && <PlantError message={error} />}
    </>
  );
};
