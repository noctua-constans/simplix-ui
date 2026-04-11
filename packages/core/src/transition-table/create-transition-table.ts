import { _TransitionTableImpl } from "./_TransitionTableImpl";
import type { TransitionTable, TransitionTableOptions } from "./transition-table.types";

import type { StateEventOf } from "@/types";

export function createTransitionTable<S extends string, C, E extends StateEventOf>(
    options: TransitionTableOptions<S, C, E>,
): TransitionTable<S, C, E> {
    return new _TransitionTableImpl(options);
}
