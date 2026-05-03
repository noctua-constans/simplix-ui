import { createStatefulMachine, type StatefulMachine } from "@simplix/core";

import { CheckboxTransitionTable } from "./checkbox.transition-table";
import type { CheckboxSchema, CheckboxStateOptions } from "./checkbox.types";

export function createCheckboxState(
    options: CheckboxStateOptions,
): StatefulMachine<CheckboxSchema["STATE"], CheckboxSchema["EVENT"], CheckboxSchema["CONTEXT"]> {
    const { initialState, context } = options;
    return createStatefulMachine({
        initialState,
        context,
        table: CheckboxTransitionTable,
    });
}
