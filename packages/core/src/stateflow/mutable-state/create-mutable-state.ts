import { MutableStateImpl } from "./mutable-state.impl";
import type { MutableState, MutableStateOptions } from "./mutable-state.types";

export function createMutableState<T>(...options: MutableStateOptions<T>): MutableState<T> {
    return new MutableStateImpl(options);
}
