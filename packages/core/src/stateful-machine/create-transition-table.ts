import { _TransitionTableImpl } from "./_TransitionTableImpl";
import type { StateEventOf, TransitionTable, TransitionTableOptions } from "./stateful-machine.types";

export function createTransitionTable<S extends string, E extends StateEventOf>(
    options: TransitionTableOptions<S, E>,
): TransitionTable<S, E> {
    return new _TransitionTableImpl(options);
}
