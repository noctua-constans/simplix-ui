import { _TransitionTableImpl } from "./_TransitionTableImpl";

import type { StateEventOf, TransitionTable, TransitionTableOptions } from "@/stateflow";

export function createTransitionTable<S extends string, C, E extends StateEventOf>(
    options: TransitionTableOptions<S, C, E>,
): TransitionTable<S, C, E> {
    return new _TransitionTableImpl(options);
}
