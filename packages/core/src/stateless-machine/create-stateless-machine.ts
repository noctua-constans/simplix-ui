import { _StatelessMachineImpl } from "./_StatelessMachineImpl";
import type { StateEventOf, StatelessMachine, StatelessMachineOptions } from "./stateless-machine.types";

export function createStatelessMachine<S extends string, E extends StateEventOf>(
    options: StatelessMachineOptions<S, E>,
): StatelessMachine<S, E> {
    return new _StatelessMachineImpl(options);
}
