import type { ControlModel, ControlModelRuntimeOptions, StatelessMachine } from "@simplix/core";
import { createControlModel } from "@simplix/core";

import type { AccordionController, AccordionControllerOptions, AccordionState } from "./accordion.types";
import type { AccordionMachineEvent, AccordionMachineState } from "./machine";
import { createAccordionMachine } from "./machine";

export class _AccordionControllerImpl implements AccordionController {
    readonly #model: ControlModel<AccordionState>;
    readonly #machine: StatelessMachine<AccordionMachineState, AccordionMachineEvent>;

    constructor(options: AccordionControllerOptions) {
        this.#model = createControlModel(options);
        this.#machine = createAccordionMachine();
    }

    get(): AccordionState {
        return this.#model.get();
    }

    open(): void {
        this.#dispatch({ type: "OPEN" });
    }

    close(): void {
        this.#dispatch({ type: "CLOSE" });
    }

    toggle(): void {
        this.#dispatch({ type: "TOGGLE" });
    }

    sync(next: AccordionState): boolean {
        return this.#model.sync(next);
    }

    subscribe(listener: () => void): () => void {
        return this.#model.subscribe(listener);
    }

    configure(next: ControlModelRuntimeOptions<AccordionState>): void {
        this.#model.configure(next);
    }

    #dispatch(event: AccordionMachineEvent): void {
        const prev = this.#model.get();

        if (!this.#machine.can(prev, event)) {
            return;
        }

        const next = this.#machine.resolve(prev, event);
        if (next === null || next === prev) {
            return;
        }

        this.#model.set(next);
    }
}
