import {
    createMutableState,
    type MachineSnapshot,
    type MutableState,
    type StateEventOf,
    type StatefulMachine,
    type StatefulMachineOptions,
    type TransitionTable,
} from "@/stateflow";

export class _StatefulMachineImpl<S extends string, C, E extends StateEventOf> implements StatefulMachine<S, C, E> {
    #state: MutableState<MachineSnapshot<S, C>>;
    readonly #table: TransitionTable<S, C, E>;

    constructor(options: StatefulMachineOptions<S, C, E>) {
        this.#state = createMutableState({ state: options.initialState, context: options.context });
        this.#table = options.table;
    }

    get(): MachineSnapshot<S, C> {
        return this.#state.get();
    }

    send<T extends E["type"]>(event: Extract<E, { type: T }>): void {
        const current = this.#state.get();

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

        this.#state.set({ state: next, context });
    }

    can<T extends E["type"]>(event: Extract<E, { type: T }>): boolean {
        const current = this.#state.get();
        return this.#table.can(current.state, current.context, event);
    }

    subscribe(listener: () => void): () => void {
        return this.#state.subscribe(listener);
    }
}
