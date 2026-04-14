import { describe, expect, it } from "vitest";

import { createId, createSequence } from "@/identity";

describe("createId", () => {
    it("creates scoped ids from the default sequence", () => {
        const id = createId();

        expect(id.peek()).toBe("undefined-0");
        expect(id.next()).toBe("undefined-0");
        expect(id.next()).toBe("undefined-1");
    });

    it("does not advance when peeking", () => {
        const id = createId();

        expect(id.peek()).toBe("undefined-0");
        expect(id.next()).toBe("undefined-0");
    });

    it("builds ids from prefix, scope, index and suffix", () => {
        const id = createId({
            prefix: "ui",
            scope: "button",
            suffix: "root",
        });

        expect(id.next()).toBe("ui-button-0-root");
    });

    it("uses a custom separator between id parts", () => {
        const id = createId({
            prefix: "app",
            scope: "menu",
            suffix: "item",
            separator: "::",
        });

        expect(id.next()).toBe("app::menu::0::item");
    });

    it("omits empty id parts", () => {
        const id = createId({
            prefix: "",
            scope: "",
            suffix: "",
        });

        expect(id.next()).toBe("0");
    });

    it("uses the provided sequence for id indexes", () => {
        const id = createId({
            scope: "item",
            sequence: createSequence({ from: 10, to: 14, step: 2 }),
        });

        expect(id.hasNext()).toBe(true);
        expect(id.next()).toBe("item-10");
        expect(id.peek()).toBe("item-12");
        expect(id.next()).toBe("item-12");
        expect(id.next()).toBe("item-14");
        expect(id.hasNext()).toBe(false);
    });

    it("resets to the sequence start by default", () => {
        const id = createId({ scope: "field" });

        expect(id.next()).toBe("field-0");
        expect(id.next()).toBe("field-1");
        expect(id.reset()).toBe(true);
        expect(id.next()).toBe("field-0");
    });

    it("resets to a provided sequence index", () => {
        const id = createId({
            scope: "field",
            sequence: createSequence({ from: 0, to: 10, step: 1 }),
        });

        expect(id.next()).toBe("field-0");
        expect(id.reset(5)).toBe(true);
        expect(id.peek()).toBe("field-5");
    });

    it("keeps the current id when reset rejects the provided index", () => {
        const id = createId({
            scope: "page",
            sequence: createSequence({ from: 0, to: 2, step: 1 }),
        });

        expect(id.next()).toBe("page-0");
        expect(id.reset(4)).toBe(false);
        expect(id.peek()).toBe("page-1");
    });

    it("throws when the sequence is exhausted", () => {
        const id = createId({
            scope: "row",
            sequence: createSequence({ from: 1, to: 2, step: 1 }),
        });

        expect(id.next()).toBe("row-1");
        expect(id.next()).toBe("row-2");
        expect(id.hasNext()).toBe(false);
        expect(() => id.peek()).toThrow("Sequence is exhausted.");
        expect(() => id.next()).toThrow("Sequence is exhausted.");
    });
});
