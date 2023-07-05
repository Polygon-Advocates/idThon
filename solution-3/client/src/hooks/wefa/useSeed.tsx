import { assign } from "xstate";
import { nanoid } from "nanoid";
import { useMachine } from "@xstate/react";
import { createContext, useContext } from "react";

import { useWefa } from "./useWefa";
import { SeedContext as SeedMachineContext, seedMachine } from "./seedMachine";

export interface SeedDataProps extends SeedMachineContext {
  plantingState: boolean;
  elementState: boolean;
  isDetecting: boolean;
  isSeeding: boolean;
  verifyPlant: (image: string | ArrayBuffer) => void;
  seedCreature: (element: WefaElement) => void;
  retrySeeding: () => void;
  reset: () => void;
}

const SeedContext = createContext<SeedDataProps | null>(null);

type Props = {
  children: React.ReactNode;
};

export const SeedProvider = ({ children }: Props) => {
  const currentValue = useContext(SeedContext);

  if (currentValue) throw new Error("SeedProvider can only be used once");
  const { handleCreatePlant, handleCreateCreature } = useWefa();
  const [state, send] = useMachine(seedMachine, {
    actions: {
      verified: assign((context, event) => {
        context.imageVerified = true;
        context.image = event.data.img;

        const plantDetails = event.data.details;

        if (plantDetails) {
          context.plant = plantDetails;

          context.image &&
            handleCreatePlant({
              ...plantDetails,
              id: `0x${nanoid()}`,
              localId: nanoid(),
              isUploaded: false,
              caretakerAddress: context.address || "0x",
              // spaceAddress: "0x",
              name: context.plant.common_names[0],
              description: plantDetails.wiki_description?.value,
              image: context.image ?? context.plant.wiki_image?.value ?? "",
              plantId: event.data.plantId,
              createdAt: new Date().getMilliseconds(),
              updatedAt: new Date().getMilliseconds(),
            }).then(() => {
              const energy = localStorage.getItem("energy");

              if (energy) {
                const energyInt = parseInt(energy);

                localStorage.setItem("energy", `${energyInt + 4}`);
              } else {
                localStorage.setItem("energy", "4");
              }
            });
        }

        return context;
      }),
      seeded: assign((context, event) => {
        const creature: Creature = {
          id: `0x${nanoid()}`,
          localId: nanoid(),
          name: "New Creature",
          description: "",
          image: event.data.img,
          createdAt: new Date().getMilliseconds(),
          updatedAt: new Date().getMilliseconds(),
          spaceId: "",
          trainer: context.address || "0x",
          model: "", // TODO: Add model
          element: event.data.element,
          isUploaded: false,
        };

        context.creature = creature;

        handleCreateCreature(creature);

        return context;
      }),
    },
  });

  const plantingState =
    state.matches("idle") ||
    state.matches("plant_verified") ||
    state.matches("verifying_plant");
  const elementState =
    state.matches("plant_verified") ||
    state.matches("seeding_creature") ||
    state.matches("creature_seeded");
  const isSeeding = state.matches("seeding_creature");
  const isDetecting = state.matches("verifying_plant");

  function verifyPlant(image: string | ArrayBuffer) {
    send({ type: "SELECT_PLANT", image });
  }

  function seedCreature(element: WefaElement) {
    if (state.matches("creature_seeded")) {
      send({ type: "REGENERATE", element });
      return;
    }

    send({ type: "SELECT_ELEMENT", element });
  }

  function retrySeeding() {
    send({ type: "RETRY_SEEDING" });
  }

  function reset() {
    send({ type: "RESET" });
  }

  return (
    <SeedContext.Provider
      value={{
        plantingState,
        elementState,
        isDetecting,
        isSeeding,
        verifyPlant,
        seedCreature,
        retrySeeding,
        reset,
        ...state.context,
      }}
    >
      {children}
    </SeedContext.Provider>
  );
};

export const useSeed = () => {
  const value = useContext(SeedContext);
  if (!value) throw new Error("Must be used within a SeedProvider");
  return value;
};
