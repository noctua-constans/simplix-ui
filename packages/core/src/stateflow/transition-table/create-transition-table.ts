import { TransitionTableImpl } from "./transition-table.impl";
import type { TransitionTable, TransitionTableOptions } from "./transition-table.types";
import type { StateEventOf } from "../stateflow.types";

export function createTransitionTable<S extends string, E extends StateEventOf, C extends object>(
    ...options: TransitionTableOptions<S, E, C>
): TransitionTable<S, E, C> {
    return new TransitionTableImpl(options);
}
