import type { Equality, Listener, Snapshot, Unsubscribe } from "@simplix/contracts";

import type { MutableState, MutableStateOptions } from "./mutable-state.types";

export class MutableStateImpl<T extends object> implements MutableState<T> {
    #internal: T;
    #snapshot: Snapshot<T>;

    readonly #listeners: Set<Listener<Snapshot<T>>>;
    readonly #equals: Equality<T>;

    constructor(options: MutableStateOptions<T>) {
        const { initial, equals } = options;

        this.#internal = { ...initial };
        this.#snapshot = this.#createSnapshot(this.#internal);
        this.#listeners = new Set();
        this.#equals = equals ?? Object.is;
    }

    get(): Snapshot<T> {
        return this.#snapshot;
    }

    set(next: T): boolean {
        if (this.#equals(this.#internal, next)) {
            return false;
        }

        this.#internal = { ...next };
        this.#snapshot = this.#createSnapshot(this.#internal);
        this.#emit();

        return true;
    }

    update(updater: (prev: Snapshot<T>) => T): boolean {
        const prev = this.#snapshot;
        const next = updater(prev);

        if (Object.is(next, prev)) {
            return false;
        }

        return this.set(next);
    }

    subscribe(listener: Listener<Snapshot<T>>): Unsubscribe {
        this.#listeners.add(listener);

        let subscribed = true;

        return () => {
            if (!subscribed) {
                return;
            }

            subscribed = false;
            this.#listeners.delete(listener);
        };
    }

    #createSnapshot(value: T): Snapshot<T> {
        return { ...value } as Snapshot<T>;
    }

    #emit(): void {
        const snapshot = this.#snapshot;

        for (const listener of [...this.#listeners]) {
            listener(snapshot);
        }
    }
}
