import { createStatefulMachine, type StatefulMachine, type StatefulMachineOptions } from "@simplix/core";

import type { DropdownMachineEvent, DropdownMachineState, DropdownMachineContext } from "./dropdown.machine.types";

export function createDropdownMachine(
    options: StatefulMachineOptions<DropdownMachineState, DropdownMachineContext, DropdownMachineEvent>,
): StatefulMachine<DropdownMachineState, DropdownMachineContext, DropdownMachineEvent> {
    return createStatefulMachine(options);
}
