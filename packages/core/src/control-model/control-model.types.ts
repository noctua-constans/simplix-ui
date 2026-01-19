import type { Configurable, Readable, Subscribable, Syncable } from "@types";

export type ControlModelCompileOptions<T> = { value: T; defaultValue?: never } | { value?: never; defaultValue: T };

export type ControlModelRuntimeOptions<T> = {
    onChange?(next: T): void;
    equals?(a: T, b: T): boolean;
};

export type ControlModelOptions<T> = ControlModelCompileOptions<T> & ControlModelRuntimeOptions<T>;

export interface ControlModel<T>
    extends Readable<T>, Subscribable, Syncable<T>, Configurable<ControlModelRuntimeOptions<T>> {
    set(next: T): void;
    update(fn: (prev: T) => T): void;
    readonly controlled: boolean;
}
