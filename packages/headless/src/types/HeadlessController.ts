import type { Readable, Subscribable } from "@simplix/core";

export interface HeadlessController<S> extends Subscribable, Readable<S> {}
