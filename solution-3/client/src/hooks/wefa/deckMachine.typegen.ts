// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.mint": {
      type: "done.invoke.mint";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.mint": { type: "error.platform.mint"; data: unknown };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    mint: "done.invoke.mint";
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    error: "error.platform.mint";
    readCreatures: "done.invoke.mint";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    isMintingValid: "MINT";
  };
  eventsCausingServices: {
    mint: "MINT";
  };
  matchesStates: "idle" | "minted" | "minting";
  tags: never;
}
