import { _StatefulMachineImpl } from "./_StatefulMachineImpl";
import type { StateEventOf, StatefulMachine, StatefulMachineOptions } from "./stateful-machine.types";

export function createStatefulMachine<S extends string, E extends StateEventOf>(
    options: StatefulMachineOptions<S, E>,
): StatefulMachine<S, E> {
    return new _StatefulMachineImpl(options);
}
