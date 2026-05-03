import type { Cursor } from "../identity.types";
import type { Sequence } from "../sequence";

import type { Resetable } from "@/types";

export type KeyOptions = {
    prefix?: string;
    suffix?: string;
    separator?: string;
    scope?: string;
    sequence?: Sequence;
};

export interface Key extends Cursor<string>, Resetable<number> {}
