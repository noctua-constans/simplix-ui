import type { ControlModel, ControlModelOptions, ControlModelRuntimeOptions } from "./control-model.types";

export class _ControlModelImpl<T> implements ControlModel<T> {
    readonly controlled: boolean;

    readonly #listeners: Set<() => void>;
    #onChange?: (next: T) => void;
    #equals: (a: T, b: T) => boolean;

    #current: T;

    constructor(options: ControlModelOptions<T>) {
        if ("value" in options) {
            this.controlled = true;
            this.#current = options.value;
        } else {
            this.controlled = false;
            this.#current = options.defaultValue;
        }

        this.#listeners = new Set();
        this.#onChange = options.onChange ?? (() => {});
        this.#equals = options.equals ?? Object.is;
    }

    get(): T {
        return this.#current;
    }

    set(next: T): void {
        if (this.controlled) {
            this.#onChange?.(next);
            return;
        }

        const changed = this.sync(next);
        if (changed) {
            this.#onChange?.(next);
        }
    }

    update(fn: (prev: T) => T): void {
        return this.set(fn(this.get()));
    }

    sync(next: T): boolean {
        if (process.env.NODE_ENV !== "production" && this.controlled) {
            console.warn(
                "[Simplix] ControlModel.sync() was called in controlled mode. " +
                    "Use onChange + external update instead.",
            );
        }

        if (this.#equals(this.#current, next)) {
            return false;
        }

        this.#current = next;
        this.#notify();
        return true;
    }

    subscribe(listener: () => void): () => void {
        this.#listeners.add(listener);
        return () => {
            this.#listeners.delete(listener);
        };
    }

    configure(next: ControlModelRuntimeOptions<T>): void {
        if ("onChange" in next) {
            this.#onChange = next.onChange;
        }
        if ("equals" in next) {
            this.#equals = next.equals;
        }
    }

    #notify(): void {
        for (const listener of [...this.#listeners]) {
            listener();
        }
    }
}
