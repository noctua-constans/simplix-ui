import type { Readable, Subscribable } from "@simplix/core";

export interface HeadlessController<TSnapshot extends object> extends Readable<TSnapshot>, Subscribable<TSnapshot> {}
