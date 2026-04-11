import { _StatefulMachineImpl } from "./_StatefulMachineImpl";

import type { StatefulMachine, StatefulMachineOptions } from "@/stateful-machine";
import type { StateEventOf } from "@/types";

export function createStatefulMachine<S extends string, C, E extends StateEventOf>(
    options: StatefulMachineOptions<S, C, E>,
): StatefulMachine<S, C, E> {
    return new _StatefulMachineImpl(options);
}
