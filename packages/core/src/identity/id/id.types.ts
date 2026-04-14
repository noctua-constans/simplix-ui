import type { Cursor, Sequence } from "@/identity";
import type { Resetable } from "@/types";

export type IdOptions = {
    prefix?: string;
    suffix?: string;
    separator?: string;
    scope?: string;
    sequence?: Sequence;
};

export interface Id extends Cursor<string>, Resetable<number> {}
