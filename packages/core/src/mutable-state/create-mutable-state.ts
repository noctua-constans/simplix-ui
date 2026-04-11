import { _MutableStateImpl } from "./_MutableStateImpl";

import type { MutableStateOptions, MutableState } from "@/mutable-state";

export function createMutableState<T>(initial: T, options?: MutableStateOptions<T>): MutableState<T> {
    return new _MutableStateImpl(initial, options);
}
