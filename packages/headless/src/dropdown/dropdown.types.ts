import type { HeadlessController } from "../types";

export type DropdownSnapshot = Readonly<{
    open: boolean;
    disabled: boolean;
}>;

export interface DropdownController extends HeadlessController<DropdownSnapshot> {
    open(): void;
    close(): void;
    toggle(): void;
    disable(): void;
    enable(): void;
}
