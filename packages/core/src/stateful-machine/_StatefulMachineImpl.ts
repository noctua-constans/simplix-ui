import type { StateEventOf, StatefulMachine, StatefulMachineOptions, TransitionTable } from "./stateful-machine.types";
import { type Store, createStore } from "../store";

export class _StatefulMachineImpl<S extends string, E extends StateEventOf> implements StatefulMachine<S, E> {
    #store: Store<S>;
    readonly #table: TransitionTable<S, E>;

    constructor(options: StatefulMachineOptions<S, E>) {
        this.#store = createStore(options.initialState);
        this.#table = options.table;
    }

    get(): S {
        return this.#store.get();
    }

    send<T extends E["type"]>(event: Extract<E, { type: T }>): void {
        const current = this.#store.get();
        const next = this.#table.resolve(current, event);

        if (next === null || current === next) {
            return;
        }

        this.#store.set(next);
    }

    can<T extends E["type"]>(event: Extract<E, { type: T }>): boolean {
        return this.#table.can(this.#store.get(), event);
    }

    subscribe(listener: () => void): () => void {
        return this.#store.subscribe(listener);
    }
}
