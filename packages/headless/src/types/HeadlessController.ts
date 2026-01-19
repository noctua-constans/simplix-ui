import type { Configurable, Readable, Subscribable, Syncable } from "@simplix/core";

export interface HeadlessController<S, O> extends Subscribable, Readable<S>, Syncable<S>, Configurable<O> {}
