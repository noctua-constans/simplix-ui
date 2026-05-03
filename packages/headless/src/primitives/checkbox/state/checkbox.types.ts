import type { StateEventOf, StateflowSchema } from "@simplix/core";

export type CheckboxSchema = StateflowSchema<
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

export type CheckboxStateOptions = {
    initialState: CheckboxSchema["STATE"];
    context: CheckboxSchema["CONTEXT"];
};
