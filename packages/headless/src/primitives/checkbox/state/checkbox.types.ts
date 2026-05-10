import type { StateEventOf, StateflowSchema, StatefulMachineOptions } from "@simplix/core";

export type CheckboxStateflowSchema = StateflowSchema<
    "checked" | "unchecked",
    | StateEventOf<"CHECK">
    | StateEventOf<"UNCHECK">
    | StateEventOf<"TOGGLE">
    | StateEventOf<"ENABLE">
    | StateEventOf<"DISABLE">,
    {
        disabled?: boolean;
    }
>;

export type CheckboxStateOptions = StatefulMachineOptions<
    CheckboxStateflowSchema["STATE"],
    CheckboxStateflowSchema["EVENT"],
    CheckboxStateflowSchema["CONTEXT"]
>;
