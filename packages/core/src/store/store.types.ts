import type { Readable, Subscribable } from "../types";

export type Equality<T> = (a: T, b: T) => boolean;

export type StoreOptions<T> = {
    equals?: Equality<T>;
};

export interface Store<T> extends Readable<T>, Subscribable {
    set(next: T): void;
    update(updater: (prev: T) => T): void;
}
