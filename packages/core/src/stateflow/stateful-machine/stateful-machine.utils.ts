import type { MachineData } from "./stateful-machine.types";

export function STATEFUL_MACHINE_EQUALS<S extends string, C extends object>(
    a: MachineData<S, C>,
    b: MachineData<S, C>,
): boolean {
    return a.state === b.state && Object.is(a.context, b.context);
}
