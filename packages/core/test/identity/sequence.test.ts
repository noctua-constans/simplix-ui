import { describe, expect, it } from "vitest";

import { createSequence } from "@/identity";

describe("createSequence", () => {
    it("starts from zero and increments by one by default", () => {
        const sequence = createSequence();

        expect(sequence.peek()).toBe(0);
        expect(sequence.next()).toBe(0);
        expect(sequence.next()).toBe(1);
        expect(sequence.peek()).toBe(2);
        expect(sequence.hasNext()).toBe(true);
    });

    it("does not advance when peeking", () => {
        const sequence = createSequence();

        expect(sequence.peek()).toBe(0);
        expect(sequence.next()).toBe(0);
    });

    it("creates an ascending finite sequence", () => {
        const sequence = createSequence({ from: 1, to: 5, step: 2 });

        expect(sequence.hasNext()).toBe(true);
        expect(sequence.next()).toBe(1);
        expect(sequence.next()).toBe(3);
        expect(sequence.next()).toBe(5);
        expect(sequence.hasNext()).toBe(false);
    });

    it("creates a descending finite sequence", () => {
        const sequence = createSequence({ from: 5, to: 1, step: -2 });

        expect(sequence.next()).toBe(5);
        expect(sequence.peek()).toBe(3);
        expect(sequence.next()).toBe(3);
        expect(sequence.next()).toBe(1);
        expect(sequence.hasNext()).toBe(false);
    });

    it("allows a single-value sequence", () => {
        const sequence = createSequence({ from: 3, to: 3, step: -1 });

        expect(sequence.hasNext()).toBe(true);
        expect(sequence.next()).toBe(3);
        expect(sequence.hasNext()).toBe(false);
        expect(() => sequence.peek()).toThrow("Sequence is exhausted.");
    });

    it("throws when reading an exhausted sequence", () => {
        const sequence = createSequence({ from: 0, to: 1, step: 1 });

        expect(sequence.next()).toBe(0);
        expect(sequence.next()).toBe(1);
        expect(sequence.hasNext()).toBe(false);
        expect(() => sequence.peek()).toThrow("Sequence is exhausted.");
        expect(() => sequence.next()).toThrow("Sequence is exhausted.");
    });

    it("resets to the original start by default", () => {
        const sequence = createSequence({ from: 2, to: 6, step: 2 });

        expect(sequence.next()).toBe(2);
        expect(sequence.next()).toBe(4);
        expect(sequence.reset()).toBe(true);
        expect(sequence.next()).toBe(2);
    });

    it("resets to a provided in-bounds value", () => {
        const sequence = createSequence({ from: 0, to: 10, step: 2 });

        expect(sequence.next()).toBe(0);
        expect(sequence.reset(6)).toBe(true);
        expect(sequence.peek()).toBe(6);
        expect(sequence.next()).toBe(6);
        expect(sequence.next()).toBe(8);
    });

    it("keeps the current value when reset receives an out-of-bounds value", () => {
        const sequence = createSequence({ from: 0, to: 4, step: 1 });

        expect(sequence.next()).toBe(0);
        expect(sequence.reset(5)).toBe(false);
        expect(sequence.peek()).toBe(1);
    });

    it("keeps the current value when reset receives a non-finite value", () => {
        const sequence = createSequence({ from: 0, to: 4, step: 1 });

        expect(sequence.next()).toBe(0);
        expect(sequence.reset(Number.POSITIVE_INFINITY)).toBe(false);
        expect(sequence.peek()).toBe(1);
    });

    it("rejects a non-finite start", () => {
        expect(() => createSequence({ from: Number.POSITIVE_INFINITY })).toThrow(
            "Sequence 'from' must be a finite number.",
        );
    });

    it("rejects NaN as the end value", () => {
        expect(() => createSequence({ to: Number.NaN })).toThrow("Sequence 'to' cannot be NaN.");
    });

    it("rejects a non-finite step", () => {
        expect(() => createSequence({ step: Number.POSITIVE_INFINITY })).toThrow(
            "Sequence 'step' must be a finite non-zero number.",
        );
    });

    it("rejects a zero step", () => {
        expect(() => createSequence({ step: 0 })).toThrow("Sequence step cannot be 0.");
    });

    it("rejects a step direction that does not match the range direction", () => {
        expect(() => createSequence({ from: 0, to: 3, step: -1 })).toThrow(
            "Sequence step direction does not match range direction.",
        );

        expect(() => createSequence({ from: 3, to: 0, step: 1 })).toThrow(
            "Sequence step direction does not match range direction.",
        );
    });
});
