import type { StateEventOf } from "../stateflow.types";
import type { TransitionTable } from "../transition-table";

import type { Readable, Subscribable } from "@/types";

export type MachineSnapshot<S extends string, C extends object> = {
    state: S;
    context: C;
};

export type StatefulMachineOptions<S extends string, E extends StateEventOf, C extends object> = {
    initialState: S;
    context: C;
    table: TransitionTable<S, E, C>;
};

export interface StatefulMachine<S extends string, E extends StateEventOf, C extends object>
    extends Readable<MachineSnapshot<S, C>>, Subscribable<MachineSnapshot<S, C>> {
    send<T extends E["type"]>(event: Extract<E, { type: T }>): void;
    can<T extends E["type"]>(event: Extract<E, { type: T }>): boolean;
}
