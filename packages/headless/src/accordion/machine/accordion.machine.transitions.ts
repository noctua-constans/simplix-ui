import type { Transitions } from "@simplix/core";

import type { AccordionMachineEvent, AccordionMachineState } from "./accordion.machine.types";

export const accordionMachineTransitions: Transitions<AccordionMachineState, AccordionMachineEvent> = {
    open: {
        CLOSE: {
            target: "closed",
        },
        TOGGLE: {
            target: "closed",
        },
    },
    closed: {
        OPEN: {
            target: "open",
        },
        TOGGLE: {
            target: "open",
        },
    },
};
