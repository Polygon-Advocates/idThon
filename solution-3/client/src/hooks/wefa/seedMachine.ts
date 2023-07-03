// import { toast } from "react-toastify";
import { createMachine, assign } from "xstate";

import { apiClient } from "../../modules/axios";
import { db, initDB } from "../../modules/idb";

export interface SeedContext {
  address?: `0x${string}`;
  image: string | null;
  imageVerified: boolean;
  element: WefaElement | null;
  plant: PlantDetails | null;
  creature: Creature | null;
  error: string | null;
}

export const seedMachine = createMachine(
  {
    id: "seed",
    version: "0.0.1",
    description:
      "Seed machine for WEFA enabling discovery flow with creature creation.",
    type: "compound",
    strict: true,
    tsTypes: {} as import("./seedMachine.typegen").Typegen0,
    predictableActionArguments: true,
    tags: ["seed", "game", "nature", "critters", "creatures"],
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
        creatureGenerator: {
          data: {
            element: WefaElement;
            img: string;
          };
        };
      },
      context: {
        image: null,
        element: null,
        creature: null,
        imageVerified: false,
        error: null,
      } as SeedContext,
    },
    states: {
      idle: {
        on: {
          SELECT_PLANT: {
            target: "verifying_plant",
            cond: "isPhotoValid",
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
          SELECT_ELEMENT: {
            target: "seeding_creature",
            cond: "isSeedingValid",
          },

          RETRY_SEEDING: {
            target: "seeding_creature",
            cond: "isSeedingRetryValid",
          },
          SELECT_PLANT: {
            target: "verifying_plant",
            cond: "isPhotoValid",
          },
        },
      },
      seeding_creature: {
        invoke: {
          id: "creatureGenerator",
          src: "creatureGenerator",
          onDone: {
            target: "creature_seeded",
            actions: "seeded",
          },
          onError: {
            target: "plant_verified",
            actions: "error",
          },
        },
      },
      creature_seeded: {
        on: {
          RESET: {
            target: "idle",
            actions: "reset",
          },
          REGENERATE: {
            target: "seeding_creature",
            cond: "isSeedingValid",
          },
        },
      },
    },
    entry: async (context) => {
      context.image = null;
      context.imageVerified = false;
      context.element = null;
      context.creature = null;
      context.error = null;

      if (!db) await initDB();

      // toast.info("Seed machine entered.");
    },
    // exit: (context, event) => {
    //   console.log("Seed machine exited.", context, event);
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
      isSeedingValid: (context, event: { element: WefaElement }) => {
        return !!context.image && (!!event.element || !!context.element);
      },
      isSeedingRetryValid: (context) => {
        return !context.creature && !!context.element;
      },
    },
    actions: {
      reset: assign((context, _event) => {
        context.address = undefined;
        context.image = null;
        context.element = null;
        context.plant = null;
        context.creature = null;
        context.imageVerified = false;
        context.error = null;

        return context;
      }),
      error: assign((context, event) => {
        switch (event.type) {
          case "error.platform.plantVerifier":
            context.imageVerified = false;
            // context.image = null;
            context.element = null;

            // @ts-ignore
            context.error = event.data.message;
            break;

          case "error.platform.creatureGenerator":
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

        // TODO: Add form image upload
        // const formData = new FormData();

        // formData.append("image", image, image.name);

        // const data = {
        //   // Add other parameters here
        // };
        // formData.append("data", JSON.stringify(data));

        try {
          const { data } = await apiClient.post<{ plant: PlantResponse }>(
            "/plants/detect",
            { image }
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
      creatureGenerator: async (context, event: { element?: WefaElement }) => {
        let element: WefaElement | null = context.element;

        if (event.element) {
          element = event.element;
          context.element = event.element;
        }

        if (!element || !context.plant) {
          throw new Error("No element or plant provided!");
        }

        try {
          const { data } = await apiClient.post<{ img: string }>(
            "/creatures/seed",
            {
              plant: context.plant.scientific_name,
              element,
            }
          );

          return { element, img: `data:image/png;base64,${data.img}` };
        } catch (error) {
          console.log("Creature generation failed!", error);
          throw error;
        }
      },
    },
  }
);
