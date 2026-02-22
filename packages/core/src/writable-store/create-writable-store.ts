import { _WrirableStoreImpl } from "./_WrirableStoreImpl";
import type { WritableStoreOptions, WritableStore } from "./writable-store.types";

export function createWritableStore<T>(initial: T, options?: WritableStoreOptions<T>): WritableStore<T> {
    return new _WrirableStoreImpl(initial, options);
}
