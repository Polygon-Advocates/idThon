import { createMachine } from "xstate";
import { readContract } from "wagmi/actions";

import { db, initDB } from "../../modules/idb";

interface WefadexContext {
  plants?: Plant[];
  creatures?: Creature[];
  error: string | null;
}

export const ABI = [
  {
    name: "getCreatures",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "image",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "level",
            type: "uint256",
          },
        ],
      },
    ],
  },
  {
    name: "mint",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    outputs: [],
  },
];

export const deckMachine = createMachine(
  {
    id: "deck",
    version: "0.0.1",
    predictableActionArguments: true,
    type: "compound",
    strict: true,
    tsTypes: {} as import("./deckMachine.typegen").Typegen0,
    initial: "idle",
    schema: {
      context: {
        plants: [],
        creatures: [],
        error: null,
      } as WefadexContext,
    },
    states: {
      idle: {
        on: {
          MINT: {
            target: "minting",
            cond: "isMintingValid",
          },
        },
      },
      minting: {
        invoke: {
          id: "mint",
          src: "mint",
          onDone: {
            target: "idle",
            actions: ["readCreatures"],
          },
          onError: {
            target: "idle",
            actions: "error",
          },
        },
      },
      minted: {
        on: {
          MINT: {
            target: "minting",
            cond: "isMintingValid",
          },
          RESET: "idle",
        },
      },
    },
    entry: async (context, _event) => {
      if (!db) await initDB();

      if (db) {
        const creaturesTx = db.transaction("creatures", "readonly");
        const creaturesStore = creaturesTx.objectStore("creatures");
        const creatures = await creaturesStore.getAll();

        context.creatures = creatures ?? [];

        const plantsTx = db.transaction("plants", "readonly");
        const plantsStore = plantsTx.objectStore("plants");
        const plants = await plantsStore.getAll();

        context.plants = plants ?? [];

        console.log("context", context);
      }
    },
    exit: async (context, _event) => {
      if (db) {
        const creaturesTx = db.transaction("creatures", "readwrite");
        const creaturesStore = creaturesTx.objectStore("creatures");
        context.creatures?.forEach((creature) => {
          creaturesStore.put(creature);
        });

        const plantsTx = db.transaction("plants", "readwrite");
        const plantsStore = plantsTx.objectStore("plants");
        context.plants?.forEach((plant) => {
          plantsStore.put(plant);
        });
      }
    },
  },
  {
    delays: {
      LIGHT_DELAY: (_context, _event) => {
        return true;
      },
    },
    guards: {
      isMintingValid: (_context, _event) => {
        return true;
      },
    },
    actions: {
      readCreatures: async (_context, _event) => {
        // await fetchSigner();

        const creatures: Creature[] = (await readContract<
          typeof ABI,
          "getCreatures"
        >({
          abi: ABI,
          address: "0x",
          functionName: "getCreatures",
        })) as Creature[];

        // Save to DB

        // console.log("Creatures", creatures);

        // Fire action to update state
      },
      error: (context, event) => {
        context.error = "Something went wrong!";
        console.log("Error!", context, event);
      },
    },
    services: {
      mint: async (_context, _event, _meta) => {
        // const { id } = event;
      },
    },
  }
);
