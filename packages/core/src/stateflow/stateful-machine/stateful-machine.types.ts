import type { Readable, Snapshot, Subscribable } from "@simplix/contracts";

import type { StateEventOf } from "../stateflow.types";
import type { TransitionTable } from "../transition-table";

export type MachineData<S extends string, C extends object> = {
    state: S;
    context: C;
};

export type StatefulMachineOptions<S extends string, E extends StateEventOf, C extends object> = {
    initial: S;
    context: C;
    table: TransitionTable<S, E, C>;
};

export interface StatefulMachine<S extends string, E extends StateEventOf, C extends object>
    extends Readable<Snapshot<MachineData<S, C>>>, Subscribable<Snapshot<MachineData<S, C>>> {
    send<T extends E["type"]>(event: Extract<E, { type: T }>): boolean;
    can<T extends E["type"]>(event: Extract<E, { type: T }>): boolean;
}
