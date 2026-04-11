import { type MutableState, createMutableState } from "@/mutable-state";
import type { StatefulMachineOptions, StatefulMachine, MachineSnapshot } from "@/stateful-machine";
import type { TransitionTable } from "@/transition-table";
import type { StateEventOf } from "@/types";

export class _StatefulMachineImpl<S extends string, C, E extends StateEventOf> implements StatefulMachine<S, C, E> {
    #store: MutableState<MachineSnapshot<S, C>>;
    readonly #table: TransitionTable<S, C, E>;

    constructor(options: StatefulMachineOptions<S, C, E>) {
        this.#store = createMutableState({ state: options.initialState, context: options.context });
        this.#table = options.table;
    }

    get(): MachineSnapshot<S, C> {
        return this.#store.get();
    }

    send<T extends E["type"]>(event: Extract<E, { type: T }>): void {
        const current = this.#store.get();

        const transition = this.#table.resolve(current.state, current.context, event);

        if (!transition) {
            return;
        }

        const next = transition.target ?? current.state;
        const context = transition.reduce
            ? transition.reduce({ state: current.state, context: current.context, event })
            : current.context;

        if (next === current.state && Object.is(context, current.context)) {
            return;
        }

        this.#store.set({ state: next, context });
    }

    can<T extends E["type"]>(event: Extract<E, { type: T }>): boolean {
        const current = this.#store.get();
        return this.#table.can(current.state, current.context, event);
    }

    subscribe(listener: () => void): () => void {
        return this.#store.subscribe(listener);
    }
}
