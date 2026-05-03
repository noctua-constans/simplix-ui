import type { Equality, MutableState, MutableStateOptions } from "./mutable-state.types";

import type { Listener, Unsubscribe } from "@/types";

export class MutableStateImpl<T> implements MutableState<T> {
    #internal: T;
    readonly #listeners: Set<Listener<T>>;
    readonly #equals: Equality<T>;

    constructor(options: MutableStateOptions<T>) {
        const [initial, equals] = options;

        this.#internal = initial;
        this.#listeners = new Set();
        this.#equals = equals ?? Object.is;
    }

    get(): T {
        return this.#internal;
    }

    set(next: T): void {
        if (this.#equals(this.#internal, next)) {
            return;
        }
        this.#internal = next;
        this.#emit(next);
    }

    update(updater: (prev: T) => T): void {
        const next = updater(this.#internal);
        this.set(next);
    }

    subscribe(listener: Listener<T>): Unsubscribe {
        this.#listeners.add(listener);

        return () => {
            this.#listeners.delete(listener);
        };
    }

    #emit(value: T): void {
        for (const listener of [...this.#listeners]) {
            listener(value);
        }
    }
}
