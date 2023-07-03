// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.creatureGenerator": {
      type: "done.invoke.creatureGenerator";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.plantVerifier": {
      type: "done.invoke.plantVerifier";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.creatureGenerator": {
      type: "error.platform.creatureGenerator";
      data: unknown;
    };
    "error.platform.plantVerifier": {
      type: "error.platform.plantVerifier";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    creatureGenerator: "done.invoke.creatureGenerator";
    plantVerifier: "done.invoke.plantVerifier";
  };
  missingImplementations: {
    actions: "seeded" | "verified";
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    error: "error.platform.creatureGenerator" | "error.platform.plantVerifier";
    reset: "RESET";
    seeded: "done.invoke.creatureGenerator";
    verified: "done.invoke.plantVerifier";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    isPhotoValid: "SELECT_PLANT";
    isSeedingRetryValid: "RETRY_SEEDING";
    isSeedingValid: "REGENERATE" | "SELECT_ELEMENT";
  };
  eventsCausingServices: {
    creatureGenerator: "REGENERATE" | "RETRY_SEEDING" | "SELECT_ELEMENT";
    plantVerifier: "SELECT_PLANT";
  };
  matchesStates:
    | "creature_seeded"
    | "idle"
    | "plant_verified"
    | "seeding_creature"
    | "verifying_plant";
  tags: "creatures" | "critters" | "game" | "nature" | "seed";
}
