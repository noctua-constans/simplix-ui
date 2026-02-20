import { createTransitionTable, type TransitionTable } from "@simplix/core";

import type { DropdownMachineEvent, DropdownMachineState } from "./dropdown.machine.types";

export const DropdownTransitions: TransitionTable<DropdownMachineState, DropdownMachineEvent> = createTransitionTable({
    transitions: {
        open: {
            CLOSE: {
                target: "closed",
            },
            TOGGLE: {
                target: "closed",
            },
            DISABLE: {
                target: "disabled",
            },
        },

        closed: {
            OPEN: {
                target: "open",
            },
            TOGGLE: {
                target: "open",
            },
            DISABLE: {
                target: "disabled",
            },
        },

        disabled: {
            ENABLE: {
                target: "closed",
            },
        },
    },
});
