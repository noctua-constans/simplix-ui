import type { Cursor, Sequence } from "@/identity";
import type { Resetable } from "@/types";

export type KeyOptions = {
    prefix?: string;
    suffix?: string;
    separator?: string;
    scope?: string;
    sequence?: Sequence;
};

export interface Key extends Cursor<string>, Resetable<number> {}
