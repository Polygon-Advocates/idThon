// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.plantVerifier": {
      type: "done.invoke.plantVerifier";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.plantVerifier": {
      type: "error.platform.plantVerifier";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    plantVerifier: "done.invoke.plantVerifier";
  };
  missingImplementations: {
    actions: "setDid" | "verified";
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    error: "error.platform.plantVerifier";
    setDid: "SET_DID";
    verified: "done.invoke.plantVerifier";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    isPhotoValid: "SELECT_PLANT";
  };
  eventsCausingServices: {
    plantVerifier: "SELECT_PLANT";
  };
  matchesStates: "idle" | "plant_verified" | "verifying_plant";
  tags: "credit" | "nature" | "plants";
}
