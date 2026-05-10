import { createTransitionTable, type TransitionTable } from "@simplix/core";

import type { CheckboxStateflowSchema } from "./checkbox.types";

export const CHECKBOX_TRANSITION_TABLE: TransitionTable<
    CheckboxStateflowSchema["STATE"],
    CheckboxStateflowSchema["EVENT"],
    CheckboxStateflowSchema["CONTEXT"]
> = createTransitionTable({
    checked: {
        UNCHECK: {
            guard: ({ context }) => !Boolean(context.disabled),
            target: "unchecked",
        },

        TOGGLE: {
            guard: ({ context }) => !Boolean(context.disabled),
            target: "unchecked",
        },

        ENABLE: {
            guard: ({ context }) => Boolean(context.disabled),
            reduce: ({ context }) => ({ ...context, disabled: false }),
        },

        DISABLE: {
            guard: ({ context }) => !Boolean(context.disabled),
            reduce: ({ context }) => ({ ...context, disabled: true }),
        },
    },

    unchecked: {
        CHECK: {
            target: "checked",
            guard: ({ context }) => !Boolean(context.disabled),
        },

        TOGGLE: {
            target: "checked",
            guard: ({ context }) => !Boolean(context.disabled),
        },

        ENABLE: {
            guard: ({ context }) => Boolean(context.disabled),
            reduce: ({ context }) => ({ ...context, disabled: false }),
        },

        DISABLE: {
            guard: ({ context }) => !Boolean(context.disabled),
            reduce: ({ context }) => ({ ...context, disabled: true }),
        },
    },
});
