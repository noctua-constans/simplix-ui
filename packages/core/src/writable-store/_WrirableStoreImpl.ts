import type { WritableStore, WritableStoreOptions, Equality } from "./writable-store.types";
import type { Listener, Unsubscribe } from "../types";

export class _WrirableStoreImpl<T> implements WritableStore<T> {
    #internal: T;
    readonly #listeners: Set<Listener>;
    readonly #equals: Equality<T>;

    constructor(initial: T, options?: WritableStoreOptions<T>) {
        this.#internal = initial;
        this.#listeners = new Set();
        this.#equals = options?.equals ?? Object.is;
    }

    get(): T {
        return this.#internal;
    }

    set(next: T): void {
        if (this.#equals(this.#internal, next)) {
            return;
        }
        this.#internal = next;
        this.#emit();
    }

    update(updater: (prev: T) => T): void {
        const next = updater(this.#internal);
        this.set(next);
    }

    subscribe(listener: () => void): Unsubscribe {
        this.#listeners.add(listener);

        return () => {
            this.#listeners.delete(listener);
        };
    }

    #emit(): void {
        for (const listener of [...this.#listeners]) {
            listener();
        }
    }
}
