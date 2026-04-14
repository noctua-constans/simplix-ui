import type { Cursor } from "@/identity";
import type { Resetable } from "@/types";

export type SequenceOptions = {
    from?: number;
    to?: number;
    step?: number;
};

export interface Sequence extends Cursor<number>, Resetable<number> {}
