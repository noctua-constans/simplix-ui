import type { Destroyable, Readable, Snapshot, Subscribable } from "@simplix/contracts";

export interface HeadlessController<T extends object>
    extends Readable<Snapshot<T>>, Subscribable<Snapshot<T>>, Destroyable {}
