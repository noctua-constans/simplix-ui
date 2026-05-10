import type { Listener, Snapshot, Unsubscribe } from "@simplix/contracts";
import {
    type CleanupRegistry,
    createCleanupRegistry,
    createMutableState,
    type MutableState,
    type StatefulMachine,
} from "@simplix/core";

import type { CheckboxController, CheckboxControllerOptions, CheckboxData } from "./checkbox.types";
import { CHECKBOX_TRANSITION_TABLE, type CheckboxStateflowSchema, createCheckboxState } from "../state";
import { CHECKBOX_DATA_EQUALITY } from "./checkbox.utils";

export class CheckboxControllerImpl implements CheckboxController {
    readonly #cleanups: CleanupRegistry;
    readonly #machine: StatefulMachine<
        CheckboxStateflowSchema["STATE"],
        CheckboxStateflowSchema["EVENT"],
        CheckboxStateflowSchema["CONTEXT"]
    >;
    readonly #snapshot: MutableState<CheckboxData>;

    constructor(options: CheckboxControllerOptions = {}) {
        const { defaultChecked = false, disabled = false, indeterminate = false } = options;
        this.#cleanups = createCleanupRegistry();

        this.#machine = createCheckboxState({
            initial: defaultChecked ? "checked" : "unchecked",
            context: {
                disabled,
            },
            table: CHECKBOX_TRANSITION_TABLE,
        });

        this.#snapshot = createMutableState<CheckboxData>({
            initial: {
                checked: defaultChecked,
                disabled,
                indeterminate,
            },
            equals: CHECKBOX_DATA_EQUALITY,
        });

        this.#cleanups.add(
            this.#machine.subscribe(({ state, context }) => {
                this.#snapshot.update((prev) => ({
                    ...prev,
                    checked: state === "checked",
                    disabled: Boolean(context.disabled),
                }));
            }),
        );
    }

    subscribe(listener: Listener<Snapshot<CheckboxData>>): Unsubscribe {
        return this.#snapshot.subscribe(listener);
    }

    destroy(): void {
        this.#cleanups.dispose();
    }

    check(): boolean {
        return this.#machine.send({ type: "CHECK" });
    }

    uncheck(): boolean {
        return this.#machine.send({ type: "UNCHECK" });
    }

    toggle(): boolean {
        return this.#machine.send({ type: "TOGGLE" });
    }

    enable(): boolean {
        return this.#machine.send({ type: "ENABLE" });
    }

    disable(): boolean {
        return this.#machine.send({ type: "DISABLE" });
    }

    setIndeterminate(indeterminate?: boolean | undefined): boolean {
        if (indeterminate === undefined) {
            return false;
        }

        return this.#snapshot.update((prev) => {
            if (prev.indeterminate === indeterminate) {
                return prev;
            }

            return {
                ...prev,
                indeterminate,
            };
        });
    }

    get(): Snapshot<CheckboxData> {
        return this.#snapshot.get();
    }
}
