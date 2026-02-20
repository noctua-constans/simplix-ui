import { _StoreImpl } from "./_StoreImpl";
import type { StoreOptions, Store } from "./store.types";

export function createStore<T>(initial: T, options?: StoreOptions<T>): Store<T> {
    return new _StoreImpl(initial, options);
}
