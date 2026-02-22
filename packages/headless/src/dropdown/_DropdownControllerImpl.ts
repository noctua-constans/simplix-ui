import {
    type StatefulMachine,
    type Listener,
    type Unsubscribe,
    type WritableStore,
    createWritableStore,
} from "@simplix/core";

import type { DropdownController, DropdownSnapshot, DropdownControllerOptions } from "./dropdown.types";
import { DropdownSnapshotEquals, normalizeToMachineOptions } from "./dropdown.utils";
import {
    type DropdownMachineState,
    type DropdownMachineEvent,
    createDropdownMachine,
    type DropdownMachineContext,
} from "./machine";

export class _DropdownControllerImpl implements DropdownController {
    readonly #machine: StatefulMachine<DropdownMachineState, DropdownMachineContext, DropdownMachineEvent>;
    readonly #store: WritableStore<DropdownSnapshot>;

    constructor(options: DropdownControllerOptions) {
        this.#machine = createDropdownMachine(normalizeToMachineOptions(options));
        this.#store = createWritableStore(this.#buildSnapshot(), { equals: DropdownSnapshotEquals });
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

    subscribe(listener: Listener): Unsubscribe {
        return this.#store.subscribe(listener);
    }

    #buildSnapshot(): DropdownSnapshot {
        const snapshot = this.#machine.get();

        return {
            open: snapshot.state === "open",
            disabled: snapshot.context.disabled,
        };
    }
}
