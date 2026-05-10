import type { Disposable, Teardown, Dispose } from "@simplix/contracts";

export interface CleanupRegistry extends Disposable {
    add(teardown: Teardown): Dispose;
}
