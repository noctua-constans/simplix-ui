import type { Readable, Subscribable, Writable } from "../types";

export type Equality<T> = (a: T, b: T) => boolean;

export type WritableStoreOptions<T> = {
    equals?: Equality<T>;
};

export interface WritableStore<T> extends Readable<T>, Writable<T>, Subscribable {
    update(updater: (prev: T) => T): void;
}
