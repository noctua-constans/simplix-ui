import { type Id, type Sequence, type IdOptions, createSequence } from "@/identity";

export class _IdImpl implements Id {
    readonly #prefix: string;
    readonly #suffix: string;
    readonly #separator: string;
    readonly #scope: string;
    readonly #sequence: Sequence;

    constructor(options: IdOptions = {}) {
        const { prefix = "", suffix = "", separator = "-", scope = "undefined", sequence = createSequence() } = options;

        this.#prefix = prefix;
        this.#suffix = suffix;
        this.#separator = separator;
        this.#scope = scope;
        this.#sequence = sequence;
    }

    next(): string {
        return this.#build(this.#sequence.next());
    }

    peek(): string {
        return this.#build(this.#sequence.peek());
    }

    hasNext(): boolean {
        return this.#sequence.hasNext();
    }

    reset(from?: number): boolean {
        return this.#sequence.reset(from);
    }

    #build(index: number): string {
        const parts = [this.#prefix, this.#scope, String(index), this.#suffix].filter((part) => part.length > 0);
        return parts.join(this.#separator);
    }
}
