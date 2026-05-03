import type { HeadlessController } from "@/types";

export type CheckboxControllerOptions = {
    defaultChecked?: boolean;
    disabled?: boolean;
};

export type CheckboxSnapshot = {
    checked: boolean;
    disabled: boolean;
    indeterminate: boolean;
};

export interface CheckboxController extends HeadlessController<CheckboxSnapshot> {
    check(): void;
    uncheck(): void;
    toggle(): void;
    enable(): void;
    disable(): void;
    setIndeterminate(indeterminate: boolean): void;
}
