import type { HeadlessController } from "@/types";

export type CheckboxControllerOptions = {
    defaultChecked?: boolean | undefined;
    disabled?: boolean | undefined;
    indeterminate?: boolean | undefined;
};

export type CheckboxData = {
    checked: boolean;
    disabled: boolean;
    indeterminate: boolean;
};

export interface CheckboxController extends HeadlessController<CheckboxData> {
    check(): boolean;
    uncheck(): boolean;
    toggle(): boolean;
    enable(): boolean;
    disable(): boolean;
    setIndeterminate(indeterminate?: boolean | undefined): boolean;
}
