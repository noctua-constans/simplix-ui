import type { Readable, Subscribable, Writable } from "@/types";

export type Equality<T> = (a: T, b: T) => boolean;

export type MutableStateOptions<T> = {
    equals?: Equality<T>;
};

export interface MutableState<T> extends Readable<T>, Writable<T>, Subscribable {
    update(updater: (prev: T) => T): void;
}
