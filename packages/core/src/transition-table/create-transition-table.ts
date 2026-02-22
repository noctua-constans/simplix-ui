import { _TransitionTableImpl } from "./_TransitionTableImpl";
import type { StateEventOf } from "../types";
import type { TransitionTable, TransitionTableOptions } from "./transition-table.types";

export function createTransitionTable<S extends string, C, E extends StateEventOf>(
    options: TransitionTableOptions<S, C, E>,
): TransitionTable<S, C, E> {
    return new _TransitionTableImpl(options);
}
