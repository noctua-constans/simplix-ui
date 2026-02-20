import type { StateEventOf } from "@simplix/core";

export type DropdownMachineState = "closed" | "open" | "disabled";

export type DropdownMachineEvent =
    | StateEventOf<"OPEN">
    | StateEventOf<"CLOSE">
    | StateEventOf<"TOGGLE">
    | StateEventOf<"ENABLE">
    | StateEventOf<"DISABLE">;
