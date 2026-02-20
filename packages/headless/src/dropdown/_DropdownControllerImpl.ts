import { type StatefulMachine, type Store, createStore } from "@simplix/core";

import type { DropdownController, DropdownSnapshot } from "./dropdown.types";
import { type DropdownMachineState, type DropdownMachineEvent, createDropdownMachine } from "./machine";

export class _DropdownControllerImpl implements DropdownController {
    readonly #machine: StatefulMachine<DropdownMachineState, DropdownMachineEvent>;
    readonly #store: Store<DropdownSnapshot>;

    constructor() {
        this.#machine = createDropdownMachine();

        this.#store = createStore(this.#buildSnapshot());
        this.#machine.subscribe(() => {
            this.#store.set(this.#buildSnapshot());
        });
    }

    get(): DropdownSnapshot {
        return this.#store.get();
    }

    open(): void {
        this.#machine.send({ type: "OPEN" });
    }

    close(): void {
        this.#machine.send({ type: "CLOSE" });
    }

    toggle(): void {
        this.#machine.send({ type: "TOGGLE" });
    }

    disable(): void {
        this.#machine.send({ type: "DISABLE" });
    }

    enable(): void {
        this.#machine.send({ type: "ENABLE" });
    }

    subscribe(listener: () => void): () => void {
        return this.#store.subscribe(listener);
    }

    #buildSnapshot(): DropdownSnapshot {
        const state = this.#machine.get();
        return {
            open: state === "open",
            disabled: state === "disabled",
        };
    }
}
