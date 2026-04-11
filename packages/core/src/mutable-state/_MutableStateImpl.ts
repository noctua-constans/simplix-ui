import type { MutableState, MutableStateOptions, Equality } from "@/mutable-state";
import type { Listener, Unsubscribe } from "@/types";

export class _MutableStateImpl<T> implements MutableState<T> {
    #internal: T;
    readonly #listeners: Set<Listener>;
    readonly #equals: Equality<T>;

    constructor(initial: T, options?: MutableStateOptions<T>) {
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

    subscribe(listener: Listener): Unsubscribe {
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
