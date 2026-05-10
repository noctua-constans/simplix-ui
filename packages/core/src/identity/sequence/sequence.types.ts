import type { Resetable } from "@simplix/contracts";

import type { Cursor } from "@/identity";

export type SequenceOptions = {
    from?: number;
    to?: number;
    step?: number;
};

export interface Sequence extends Cursor<number>, Resetable<number> {}
