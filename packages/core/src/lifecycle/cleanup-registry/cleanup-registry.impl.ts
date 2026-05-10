import type { Dispose, Teardown } from "@simplix/contracts";
import { NOOP } from "@simplix/contracts";

import type { CleanupRegistry } from "./cleanup-registry.types";

export class CleanupRegistryImpl implements CleanupRegistry {
    readonly #cleanups: Map<Teardown, Dispose>;
    #destroyed: boolean;

    constructor() {
        this.#cleanups = new Map();
        this.#destroyed = false;
    }

    add(teardown: Teardown): Dispose {
        if (this.#destroyed) {
            teardown();
            return NOOP;
        }

        const existing = this.#cleanups.get(teardown);
        if (existing) {
            return existing;
        }

        let disposed = false;
        const dispose: Dispose = () => {
            if (disposed) {
                return;
            }

            disposed = true;
            this.#cleanups.delete(teardown);
            teardown();
        };

        this.#cleanups.set(teardown, dispose);

        return dispose;
    }

    dispose(): void {
        if (this.#destroyed) {
            return;
        }

        this.#destroyed = true;

        for (const dispose of [...this.#cleanups.values()]) {
            dispose();
        }

        this.#cleanups.clear();
    }
}
