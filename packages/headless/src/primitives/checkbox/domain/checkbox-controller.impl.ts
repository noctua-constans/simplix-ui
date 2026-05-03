import {
    createMutableState,
    type Listener,
    type MutableState,
    type StatefulMachine,
    type Unsubscribe,
} from "@simplix/core";

import type { CheckboxController, CheckboxControllerOptions, CheckboxSnapshot } from "./checkbox.types";
import { type CheckboxSchema, createCheckboxState } from "../state";

export class CheckboxControllerImpl implements CheckboxController {
    readonly #machine: StatefulMachine<CheckboxSchema["STATE"], CheckboxSchema["EVENT"], CheckboxSchema["CONTEXT"]>;
    readonly #snapshot: MutableState<CheckboxSnapshot>;

    constructor(options: CheckboxControllerOptions = {}) {
        const { defaultChecked = false, disabled = false } = options;

        this.#machine = createCheckboxState({
            initialState: defaultChecked ? "checked" : "unchecked",
            context: {
                disabled,
            },
        });
        this.#snapshot = createMutableState<CheckboxSnapshot>(
            {
                checked: defaultChecked,
                disabled,
                indeterminate: false,
            },
            (a, b) => a.checked === b.checked && a.disabled === b.disabled && a.indeterminate === b.indeterminate,
        );

        this.#machine.subscribe(({ state, context }) => {
            this.#snapshot.update((prev) => ({
                ...prev,
                checked: state === "checked",
                disabled: Boolean(context.disabled),
            }));
        });
    }

    get(): CheckboxSnapshot {
        return this.#snapshot.get();
    }

    check(): void {
        this.#machine.send({ type: "CHECK" });
    }

    uncheck(): void {
        this.#machine.send({ type: "UNCHECK" });
    }

    toggle(): void {
        this.#machine.send({ type: "TOGGLE" });
    }

    enable(): void {
        this.#machine.send({ type: "ENABLE" });
    }

    disable(): void {
        this.#machine.send({ type: "DISABLE" });
    }

    setIndeterminate(indeterminate: boolean): void {
        this.#snapshot.update((prev) => ({ ...prev, indeterminate }));
    }

    subscribe(listener: Listener<CheckboxSnapshot>): Unsubscribe {
        return this.#snapshot.subscribe(listener);
    }
}
