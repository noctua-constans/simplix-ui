import { describe, expect, it } from "vitest";

import { createKey, createSequence } from "@/identity";

describe("createKey", () => {
    it("creates scoped keys from the default sequence", () => {
        const key = createKey();

        expect(key.peek()).toBe("undefined-0");
        expect(key.next()).toBe("undefined-0");
        expect(key.next()).toBe("undefined-1");
    });

    it("does not advance when peeking", () => {
        const key = createKey();

        expect(key.peek()).toBe("undefined-0");
        expect(key.next()).toBe("undefined-0");
    });

    it("builds keys from prefix, scope, index and suffix", () => {
        const key = createKey({
            prefix: "ui",
            scope: "button",
            suffix: "root",
        });

        expect(key.next()).toBe("ui-button-0-root");
    });

    it("uses a custom separator between key parts", () => {
        const key = createKey({
            prefix: "app",
            scope: "menu",
            suffix: "item",
            separator: "::",
        });

        expect(key.next()).toBe("app::menu::0::item");
    });

    it("omits empty key parts", () => {
        const key = createKey({
            prefix: "",
            scope: "",
            suffix: "",
        });

        expect(key.next()).toBe("0");
    });

    it("uses the provided sequence for key indexes", () => {
        const key = createKey({
            scope: "item",
            sequence: createSequence({ from: 10, to: 14, step: 2 }),
        });

        expect(key.hasNext()).toBe(true);
        expect(key.next()).toBe("item-10");
        expect(key.peek()).toBe("item-12");
        expect(key.next()).toBe("item-12");
        expect(key.next()).toBe("item-14");
        expect(key.hasNext()).toBe(false);
    });

    it("resets to the sequence start by default", () => {
        const key = createKey({ scope: "field" });

        expect(key.next()).toBe("field-0");
        expect(key.next()).toBe("field-1");
        expect(key.reset()).toBe(true);
        expect(key.next()).toBe("field-0");
    });

    it("resets to a provided sequence index", () => {
        const key = createKey({
            scope: "field",
            sequence: createSequence({ from: 0, to: 10, step: 1 }),
        });

        expect(key.next()).toBe("field-0");
        expect(key.reset(5)).toBe(true);
        expect(key.peek()).toBe("field-5");
    });

    it("keeps the current key when reset rejects the provided index", () => {
        const key = createKey({
            scope: "page",
            sequence: createSequence({ from: 0, to: 2, step: 1 }),
        });

        expect(key.next()).toBe("page-0");
        expect(key.reset(4)).toBe(false);
        expect(key.peek()).toBe("page-1");
    });

    it("throws when the sequence is exhausted", () => {
        const key = createKey({
            scope: "row",
            sequence: createSequence({ from: 1, to: 2, step: 1 }),
        });

        expect(key.next()).toBe("row-1");
        expect(key.next()).toBe("row-2");
        expect(key.hasNext()).toBe(false);
        expect(() => key.peek()).toThrow("Sequence is exhausted.");
        expect(() => key.next()).toThrow("Sequence is exhausted.");
    });
});
