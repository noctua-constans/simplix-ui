import type { StateEventOf, StatelessMachine, StatelessMachineOptions, Transitions } from "./stateless-machine.types";

export class _StatelessMachineImpl<S extends string, E extends StateEventOf> implements StatelessMachine<S, E> {
    readonly #transitions: Transitions<S, E>;

    constructor(options: StatelessMachineOptions<S, E>) {
        this.#transitions = options.transitions;
    }

    resolve<T extends E["type"]>(state: S, event: Extract<E, { type: T }>): S | null {
        const transition = this.#transitions[state]?.[event.type];
        if (!transition) {
            return null;
        }

        if (transition.guard && !transition.guard({ state, event })) {
            return null;
        }

        return transition.target;
    }

    can<T extends E["type"]>(state: S, event: Extract<E, { type: T }>): boolean {
        const transition = this.#transitions[state]?.[event.type];

        if (!transition) {
            return false;
        }

        return transition.guard?.({ state, event }) ?? true;
    }
}
