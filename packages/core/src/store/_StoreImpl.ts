import type { Store, StoreOptions, Equality } from "./store.types";

export class _StoreImpl<T> implements Store<T> {
    #internal: T;
    readonly #listeners: Set<() => void>;
    readonly #equals: Equality<T>;

    constructor(initial: T, options?: StoreOptions<T>) {
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

    subscribe(listener: () => void): () => void {
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
