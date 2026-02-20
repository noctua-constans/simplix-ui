import { createStatefulMachine, type StatefulMachine } from "@simplix/core";

import type { DropdownMachineEvent, DropdownMachineState } from "./dropdown.machine.types";
import { DropdownTransitions } from "./dropdown.transitions";

export function createDropdownMachine(): StatefulMachine<DropdownMachineState, DropdownMachineEvent> {
    return createStatefulMachine({
        initialState: "closed",
        table: DropdownTransitions,
    });
}
