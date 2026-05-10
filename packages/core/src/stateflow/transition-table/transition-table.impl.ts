import type { StateEventOf } from "../stateflow.types";
import type { Transition, Transitions, TransitionTable, TransitionTableOptions } from "./transition-table.types";

export class TransitionTableImpl<S extends string, E extends StateEventOf, C extends object> implements TransitionTable<
    S,
    E,
    C
> {
    readonly #transitions: Transitions<S, E, C>;

    constructor(options: TransitionTableOptions<S, E, C>) {
        const [transitions] = options;
        this.#transitions = transitions;
    }

    resolve<T extends E["type"]>(
        state: S,
        event: Extract<E, { type: T }>,
        context: C,
    ): Transition<S, S, Extract<E, { type: T }>, C> | null {
        const transition = this.#transitions[state]?.[event.type];
        if (!transition) {
            return null;
        }

        if (transition.guard?.({ state, event, context }) ?? true) {
            return transition;
        }

        return null;
    }

    can<T extends E["type"]>(state: S, event: Extract<E, { type: T }>, context: C): boolean {
        const transition = this.#transitions[state]?.[event.type];

        if (!transition) {
            return false;
        }

        return transition.guard?.({ state, event, context }) ?? true;
    }
}
