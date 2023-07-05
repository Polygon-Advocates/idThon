import { assign } from "xstate";
import { nanoid } from "nanoid";
import { useMachine } from "@xstate/react";
import { createContext, useContext } from "react";

import { usePlants } from "./usePlants";
import {
  PlantVerifierContext as PlantVerifierMachineContext,
  seedMachine,
} from "./verifyMachine";

export interface PlantVerifierDataProps extends PlantVerifierMachineContext {
  isDetecting: boolean;
  verifyHealth: (image: string | ArrayBuffer) => void;
  reset: () => void;
}

const PlantVerifierContext = createContext<PlantVerifierDataProps | null>(null);

type Props = {
  children: React.ReactNode;
};

export const PlantVerifierProvider = ({ children }: Props) => {
  const currentValue = useContext(PlantVerifierContext);

  if (currentValue)
    throw new Error("PlantVerifierProvider can only be used once");

  const { handleCreatePlant } = usePlants();
  const [state, send] = useMachine(seedMachine, {
    actions: {
      setDid: assign((context, event) => {
        // @ts-ignore
        context.did = event.data.did;
        return context;
      }),
      verified: assign((context, event) => {
        context.imageVerified = true;
        context.image = event.data.img;

        const plantDetails = event.data.details;

        if (plantDetails) {
          context.plant = plantDetails;

          context.image &&
            handleCreatePlant({
              ...plantDetails,
              plantDid: nanoid(),
              spaceDid: nanoid(),
              canClaimCredit: false,
              health: 100,
              plantDate: new Date().getMilliseconds(),
              name: context.plant.common_names[0],
              description: plantDetails.wiki_description?.value,
              image: context.image ?? context.plant.wiki_image?.value ?? "",
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
    },
  });

  const isDetecting = state.matches("verifying_plant");

  function setDid(did: string) {
    send({ type: "SET_DID", did });
  }

  function verifyHealth(image: string | ArrayBuffer) {
    send({ type: "SELECT_PLANT", image });
  }

  function reset() {
    send({ type: "RESET" });
  }

  return (
    <PlantVerifierContext.Provider
      value={{
        isDetecting,
        verifyHealth,
        reset,
        ...state.context,
      }}
    >
      {children}
    </PlantVerifierContext.Provider>
  );
};

export const usePlantVerifier = () => {
  const value = useContext(PlantVerifierContext);
  if (!value) throw new Error("Must be used within a PlantVerifierProvider");
  return value;
};
