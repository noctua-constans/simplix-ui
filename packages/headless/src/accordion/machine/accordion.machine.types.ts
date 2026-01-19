import type { StateEventOf } from "@simplix/core";

export type AccordionMachineState = "closed" | "open";

export type AccordionMachineEvent = StateEventOf<"OPEN"> | StateEventOf<"CLOSE"> | StateEventOf<"TOGGLE">;
