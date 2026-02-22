import type { TransitionTable } from "../transition-table";
import type { Readable, Subscribable, StateEventOf } from "../types";

export type MachineSnapshot<S extends string, C> = {
    state: S;
    context: C;
};

export type StatefulMachineOptions<S extends string, C, E extends StateEventOf> = {
    initialState: S;
    context: C;
    table: TransitionTable<S, C, E>;
};

export interface StatefulMachine<S extends string, C, E extends StateEventOf>
    extends Readable<MachineSnapshot<S, C>>, Subscribable {
    send<T extends E["type"]>(event: Extract<E, { type: T }>): void;
    can<T extends E["type"]>(event: Extract<E, { type: T }>): boolean;
}
