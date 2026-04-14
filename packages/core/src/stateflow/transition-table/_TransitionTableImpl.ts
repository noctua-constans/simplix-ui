import type { StateEventOf, Transition, Transitions, TransitionTable, TransitionTableOptions } from "@/stateflow";

export class _TransitionTableImpl<S extends string, C, E extends StateEventOf> implements TransitionTable<S, C, E> {
    readonly #transitions: Transitions<S, C, E>;

    constructor(options: TransitionTableOptions<S, C, E>) {
        this.#transitions = options.transitions;
    }

    resolve<T extends E["type"]>(
        state: S,
        context: C,
        event: Extract<E, { type: T }>,
    ): Transition<S, S, C, Extract<E, { type: T }>> | null {
        const transition = this.#transitions[state]?.[event.type];
        if (!transition) {
            return null;
        }

        if (transition.guard && !transition.guard({ state, context, event })) {
            return null;
        }

        return transition;
    }

    can<T extends E["type"]>(state: S, context: C, event: Extract<E, { type: T }>): boolean {
        const transition = this.#transitions[state]?.[event.type];

        if (!transition) {
            return false;
        }

        return transition.guard?.({ state, context, event }) ?? true;
    }
}
