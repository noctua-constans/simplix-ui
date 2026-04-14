import type { Sequence, SequenceOptions } from "@/identity";

export class _SequenceImpl implements Sequence {
    readonly #from: number;
    readonly #to: number;
    readonly #step: number;

    #current: number;

    constructor(options: SequenceOptions = {}) {
        const { from = 0, to = Number.POSITIVE_INFINITY, step = 1 } = options;

        if (!Number.isFinite(from)) {
            throw new Error("Sequence 'from' must be a finite number.");
        }

        if (Number.isNaN(to)) {
            throw new Error("Sequence 'to' cannot be NaN.");
        }

        if (!Number.isFinite(step)) {
            throw new Error("Sequence 'step' must be a finite non-zero number.");
        }

        if (step === 0) {
            throw new Error("Sequence step cannot be 0.");
        }

        const direction = Math.sign(to - from);
        const stepDirection = Math.sign(step);

        if (direction !== 0 && direction !== stepDirection) {
            throw new Error("Sequence step direction does not match range direction.");
        }

        this.#from = from;
        this.#to = to;
        this.#step = step;
        this.#current = from;
    }

    next(): number {
        if (!this.#isWithinBounds(this.#current)) {
            throw new Error("Sequence is exhausted.");
        }

        const current = this.#current;
        this.#current += this.#step;

        return current;
    }

    peek(): number {
        if (!this.#isWithinBounds(this.#current)) {
            throw new Error("Sequence is exhausted.");
        }

        return this.#current;
    }

    hasNext(): boolean {
        return this.#isWithinBounds(this.#current);
    }

    reset(from: number = this.#from): boolean {
        if (!Number.isFinite(from)) {
            return false;
        }

        if (!this.#isWithinBounds(from)) {
            return false;
        }

        this.#current = from;
        return true;
    }

    #isWithinBounds(index: number): boolean {
        if (this.#step > 0) {
            return index >= this.#from && index <= this.#to;
        }

        return index <= this.#from && index >= this.#to;
    }
}
