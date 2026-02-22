import type { Equality, StatefulMachineOptions } from "@simplix/core";

import type { DropdownSnapshot, DropdownControllerOptions } from "./dropdown.types";
import type { DropdownMachineState, DropdownMachineContext, DropdownMachineEvent } from "./machine";
import { DropdownTransitions } from "./machine/dropdown.transitions";

export const DEFAULT_OPTIONS = { defaultOpen: false, disabled: false } as const;

export function normalizeToMachineOptions(
    options: DropdownControllerOptions,
): StatefulMachineOptions<DropdownMachineState, DropdownMachineContext, DropdownMachineEvent> {
    const defaultOpen = options.defaultOpen ?? DEFAULT_OPTIONS.defaultOpen;
    const disabled = options.disabled ?? DEFAULT_OPTIONS.disabled;
    const context = { disabled };
    const initialState = disabled ? "closed" : defaultOpen ? "open" : "closed";

    return {
        initialState,
        context,
        table: DropdownTransitions,
    };
}

export const DropdownSnapshotEquals: Equality<DropdownSnapshot> = (a, b) =>
    a.open === b.open && a.disabled === b.disabled;
