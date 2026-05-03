import { StatefulMachineImpl } from "./stateful-machine.impl";
import type { StatefulMachine, StatefulMachineOptions } from "./stateful-machine.types";
import type { StateEventOf } from "../stateflow.types";

export function createStatefulMachine<S extends string, E extends StateEventOf, C extends object>(
    options: StatefulMachineOptions<S, E, C>,
): StatefulMachine<S, E, C> {
    return new StatefulMachineImpl(options);
}
