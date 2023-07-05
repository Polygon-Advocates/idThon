// import { toast } from "react-toastify";
import { createMachine, assign } from "xstate";

import { apiClient } from "../../modules/axios";
import { db, initDB } from "../../modules/idb";

export interface PlantVerifierContext {
  did?: `0x${string}`;
  image: string | null;
  imageVerified: boolean;
  plant: PlantDetails | null;
  error: string | null;
}

export const seedMachine = createMachine(
  {
    id: "seed",
    version: "0.0.1",
    description:
      "PlantVerifier machine for WEFA enabling discovery flow with creature creation.",
    type: "compound",
    strict: true,
    tsTypes: {} as import("./verifyMachine.typegen").Typegen0,
    predictableActionArguments: true,
    tags: ["plants", "credit", "nature"],
    initial: "idle",
    schema: {
      services: {} as {
        plantVerifier: {
          data: {
            plantId: number;
            details: PlantDetails | undefined;
            img: string;
          };
        };
      },
      context: {
        image: null,
        imageVerified: false,
        error: null,
      } as PlantVerifierContext,
    },
    states: {
      idle: {
        on: {
          SELECT_PLANT: {
            target: "verifying_plant",
            cond: "isPhotoValid",
          },
          SET_DID: {
            target: "idle",
            actions: "setDid",
          },
        },
      },
      verifying_plant: {
        invoke: {
          id: "plantVerifier",
          src: "plantVerifier",
          onDone: {
            target: "plant_verified",
            actions: "verified",
          },
          onError: {
            target: "idle",
            actions: "error",
          },
        },
      },
      plant_verified: {
        on: {
          SELECT_PLANT: {
            target: "verifying_plant",
            cond: "isPhotoValid",
          },
        },
      },
    },
    entry: async (context) => {
      context.image = null;
      context.imageVerified = false;
      context.error = null;

      if (!db) await initDB();

      // toast.info("PlantVerifier machine entered.");
    },
    // exit: (context, event) => {
    //   console.log("PlantVerifier machine exited.", context, event);
    // },
  },
  {
    delays: {
      LIGHT_DELAY: (_context, _event) => {
        return true;
      },
    },
    guards: {
      isPhotoValid: (_context, event: { image: string | ArrayBuffer }) => {
        return !!event.image;
      },
    },
    actions: {
      error: assign((context, event) => {
        switch (event.type) {
          case "error.platform.plantVerifier":
            context.imageVerified = false;
            // context.image = null;

            // @ts-ignore
            context.error = event.data.message;
            break;

          default:
            break;
        }
        console.log("Error!", context, event);

        // toast.error(context.error || "Error with creature generator.");

        return context;
      }),
    },
    services: {
      plantVerifier: async (context, event: { image?: string }, _meta) => {
        let image: string | null = context.image;

        if (event.image) {
          image = event.image;
        }

        if (!image) {
          throw new Error("No image provided!");
        }

        try {
          const { data } = await apiClient.post<{ plant: PlantHealth }>(
            "/plants/verify",
            { image, userDid: context.did, plantDId: "", spaceDId: "" }
          );

          return {
            plantId: data.plant.suggestions[0].id,
            details: data.plant.suggestions[0].plant_details,
            img: image,
          };
        } catch (error) {
          console.log("Photo verification failed!", error);
          throw error;
        }
      },
    },
  }
);
