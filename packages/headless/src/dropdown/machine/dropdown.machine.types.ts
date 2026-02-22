import type { StateEventOf } from "@simplix/core";

export type DropdownMachineState = "closed" | "open";

export type DropdownMachineEvent =
    | StateEventOf<"OPEN">
    | StateEventOf<"CLOSE">
    | StateEventOf<"TOGGLE">
    | StateEventOf<"DISABLE">
    | StateEventOf<"ENABLE">;

export type DropdownMachineContext = {
    disabled: boolean;
};
