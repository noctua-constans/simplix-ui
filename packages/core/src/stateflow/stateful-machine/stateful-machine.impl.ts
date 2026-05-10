import type { Listener, Snapshot, Unsubscribe } from "@simplix/contracts";

import { createMutableState, type MutableState } from "../mutable-state";
import type { StateEventOf } from "../stateflow.types";
import type { TransitionTable } from "../transition-table";
import type { MachineData, StatefulMachine, StatefulMachineOptions } from "./stateful-machine.types";
import { STATEFUL_MACHINE_EQUALS } from "./stateful-machine.utils";

export class StatefulMachineImpl<S extends string, E extends StateEventOf, C extends object> implements StatefulMachine<
    S,
    E,
    C
> {
    readonly #state: MutableState<MachineData<S, C>>;
    readonly #table: TransitionTable<S, E, C>;

    constructor(options: StatefulMachineOptions<S, E, C>) {
        const { initial: state, context, table } = options;

        this.#state = createMutableState({ initial: { state, context }, equals: STATEFUL_MACHINE_EQUALS });
        this.#table = table;
    }

    get(): Snapshot<MachineData<S, C>> {
        return this.#state.get();
    }

    send<T extends E["type"]>(event: Extract<E, { type: T }>): boolean {
        const current = this.#state.get();

        const transition = this.#table.resolve(current.state, event, current.context);

        if (!transition) {
            return false;
        }

        const next: MachineData<S, C> = {
            state: transition.target ?? current.state,
            context: transition.reduce
                ? transition.reduce({
                      state: current.state,
                      context: current.context,
                      event,
                  })
                : current.context,
        };

        return this.#state.set(next);
    }

    can<T extends E["type"]>(event: Extract<E, { type: T }>): boolean {
        const { state: currentState, context: currentContext } = this.#state.get();

        return this.#table.can(currentState, event, currentContext);
    }

    subscribe(listener: Listener<Snapshot<MachineData<S, C>>>): Unsubscribe {
        return this.#state.subscribe(listener);
    }
}
