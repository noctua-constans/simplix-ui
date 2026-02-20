import { describe, expect, it, vi } from "vitest";

import { createTransitionTable, type StateEventOf, type Transitions } from "../../src";

type MockState = "closed" | "open";
type MockEvent = StateEventOf<"OPEN"> | StateEventOf<"CLOSE"> | StateEventOf<"TOGGLE">;

const MockTransitions: Transitions<MockState, MockEvent> = {
    closed: {
        OPEN: { target: "open" },
        TOGGLE: { target: "open" },
    },
    open: {
        CLOSE: { target: "closed" },
        TOGGLE: { target: "closed" },
    },
};

describe("createTransitionTable", () => {
    it("resolves existing transitions", () => {
        const table = createTransitionTable({ transitions: MockTransitions });

        expect(table.resolve("closed", { type: "OPEN" })).toBe("open");
        expect(table.resolve("closed", { type: "TOGGLE" })).toBe("open");
        expect(table.resolve("open", { type: "CLOSE" })).toBe("closed");
        expect(table.resolve("open", { type: "TOGGLE" })).toBe("closed");
    });

    it("returns null/false for missing transition", () => {
        const table = createTransitionTable({ transitions: MockTransitions });

        expect(table.resolve("closed", { type: "CLOSE" })).toBeNull();
        expect(table.resolve("open", { type: "OPEN" })).toBeNull();
        expect(table.can("closed", { type: "CLOSE" })).toBe(false);
        expect(table.can("open", { type: "OPEN" })).toBe(false);
    });

    it("uses guard in resolve() and can()", () => {
        const allowOpen = vi.fn(() => true);
        const denyToggle = vi.fn(() => false);
        const transitions: Transitions<MockState, MockEvent> = {
            ...MockTransitions,
            closed: {
                ...MockTransitions.closed,
                OPEN: { target: "open", guard: allowOpen },
                TOGGLE: { target: "open", guard: denyToggle },
            },
        };
        const table = createTransitionTable({ transitions });
        const openEvent: MockEvent = { type: "OPEN" };
        const toggleEvent: MockEvent = { type: "TOGGLE" };

        expect(table.resolve("closed", openEvent)).toBe("open");
        expect(table.resolve("closed", toggleEvent)).toBeNull();
        expect(table.can("closed", openEvent)).toBe(true);
        expect(table.can("closed", toggleEvent)).toBe(false);

        expect(allowOpen).toHaveBeenCalledWith({ state: "closed", event: openEvent });
        expect(denyToggle).toHaveBeenCalledWith({ state: "closed", event: toggleEvent });
    });

    it("keeps can() and resolve() behavior consistent", () => {
        const guard = vi.fn(({ event }: { state: MockState; event: MockEvent }) => event.type !== "OPEN");
        const transitions: Transitions<MockState, MockEvent> = {
            ...MockTransitions,
            closed: {
                ...MockTransitions.closed,
                OPEN: { target: "open", guard },
            },
        };
        const table = createTransitionTable({ transitions });
        const openEvent: MockEvent = { type: "OPEN" };
        const toggleEvent: MockEvent = { type: "TOGGLE" };

        expect(table.can("closed", openEvent)).toBe(table.resolve("closed", openEvent) !== null);
        expect(table.can("closed", toggleEvent)).toBe(table.resolve("closed", toggleEvent) !== null);
    });
});
