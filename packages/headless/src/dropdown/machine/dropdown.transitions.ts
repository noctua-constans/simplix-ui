import { createTransitionTable, type TransitionTable } from "@simplix/core";

import type { DropdownMachineEvent, DropdownMachineState, DropdownMachineContext } from "./dropdown.machine.types";

export const DropdownTransitions: TransitionTable<DropdownMachineState, DropdownMachineContext, DropdownMachineEvent> =
    createTransitionTable({
        transitions: {
            open: {
                CLOSE: {
                    target: "closed",
                },
                TOGGLE: {
                    target: "closed",
                },
                DISABLE: {
                    target: "closed",
                    reduce: ({ context }) => ({ ...context, disabled: true }),
                },
                ENABLE: {
                    target: "closed",
                    reduce: ({ context }) => ({ ...context, disabled: false }),
                },
            },

            closed: {
                OPEN: {
                    target: "open",
                    guard: ({ context }) => !context.disabled,
                },
                TOGGLE: {
                    target: "open",
                    guard: ({ context }) => !context.disabled,
                },
                DISABLE: {
                    reduce: ({ context }) => ({ ...context, disabled: true }),
                },
                ENABLE: {
                    reduce: ({ context }) => ({ ...context, disabled: false }),
                },
            },
        },
    });
