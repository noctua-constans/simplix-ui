import type { CheckboxData } from "./checkbox.types";

export function CHECKBOX_DATA_EQUALITY(a: CheckboxData, b: CheckboxData): boolean {
    return a.checked === b.checked && a.disabled === b.disabled && a.indeterminate === b.indeterminate;
}
