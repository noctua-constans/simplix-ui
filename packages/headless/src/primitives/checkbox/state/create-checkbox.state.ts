import { createStatefulMachine, type StatefulMachine } from "@simplix/core";

import type { CheckboxStateflowSchema, CheckboxStateOptions } from "./checkbox.types";

export function createCheckboxState(
    options: CheckboxStateOptions,
): StatefulMachine<
    CheckboxStateflowSchema["STATE"],
    CheckboxStateflowSchema["EVENT"],
    CheckboxStateflowSchema["CONTEXT"]
> {
    const { initial, context, table } = options;
    return createStatefulMachine({
        initial,
        context,
        table,
    });
}
