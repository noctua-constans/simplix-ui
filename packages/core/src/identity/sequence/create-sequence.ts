import { SequenceImpl } from "./sequence.impl";
import type { Sequence, SequenceOptions } from "./sequence.types";

export function createSequence(options?: SequenceOptions): Sequence {
    return new SequenceImpl(options);
}
