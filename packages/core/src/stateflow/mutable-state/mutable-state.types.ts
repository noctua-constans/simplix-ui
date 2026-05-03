import type { Readable, Subscribable, Writable } from "@/types";

export type Equality<T> = (a: T, b: T) => boolean;

export type MutableStateOptions<T> = [initial: T, equals?: Equality<T>];

export interface MutableState<T> extends Readable<T>, Writable<T>, Subscribable<T> {
    update(updater: (prev: T) => T): void;
}
