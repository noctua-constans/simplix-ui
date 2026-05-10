import type { Equality, Readable, Snapshot, Subscribable, Writable } from "@simplix/contracts";

export type MutableStateOptions<T extends object> = { initial: T; equals?: Equality<T> };

export interface MutableState<T extends object> extends Readable<Snapshot<T>>, Writable<T>, Subscribable<Snapshot<T>> {
    update(updater: (prev: Snapshot<T>) => T): boolean;
}
