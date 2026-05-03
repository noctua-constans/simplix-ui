import { createTransitionTable, type TransitionTable } from "@simplix/core";

import type { CheckboxSchema } from "./checkbox.types";

export const CheckboxTransitionTable: TransitionTable<
    CheckboxSchema["STATE"],
    CheckboxSchema["EVENT"],
    CheckboxSchema["CONTEXT"]
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
