import { _SequenceImpl } from "./_SequenceImpl";

import type { SequenceOptions, Sequence } from "@/identity";

export function createSequence(options?: SequenceOptions): Sequence {
    return new _SequenceImpl(options);
}
