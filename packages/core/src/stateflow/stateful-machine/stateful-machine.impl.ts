import { createMutableState, type MutableState } from "../mutable-state";
import type { StateEventOf } from "../stateflow.types";
import type { TransitionTable } from "../transition-table";
import type { MachineSnapshot, StatefulMachine, StatefulMachineOptions } from "./stateful-machine.types";

import type { Listener, Unsubscribe } from "@/types";

export class StatefulMachineImpl<S extends string, E extends StateEventOf, C extends object> implements StatefulMachine<
    S,
    E,
    C
> {
    #state: MutableState<MachineSnapshot<S, C>>;
    readonly #table: TransitionTable<S, E, C>;

    constructor(options: StatefulMachineOptions<S, E, C>) {
        const { initialState, context, table } = options;

        this.#state = createMutableState({ state: initialState, context: context });
        this.#table = table;
    }

    get(): MachineSnapshot<S, C> {
        return this.#state.get();
    }

    send<T extends E["type"]>(event: Extract<E, { type: T }>): void {
        const current = this.#state.get();

        const transition = this.#table.resolve(current.state, event, current.context);

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
        return this.#table.can(current.state, event, current.context);
    }

    subscribe(listener: Listener<MachineSnapshot<S, C>>): Unsubscribe {
        return this.#state.subscribe(listener);
    }
}
