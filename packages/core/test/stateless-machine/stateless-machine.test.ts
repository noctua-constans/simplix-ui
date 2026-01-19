import { describe, expect, it, vi } from "vitest";

import type { StateEventOf, Transitions } from "../../src";
import { createStatelessMachine } from "../../src";

type TestStates = "closed" | "open";
type TestEvents = StateEventOf<"OPEN"> | StateEventOf<"CLOSE"> | StateEventOf<"TOGGLE">;

const transitions: Transitions<TestStates, TestEvents> = {
    closed: {
        OPEN: { target: "open" },
        TOGGLE: { target: "open" },
    },
    open: {
        CLOSE: { target: "closed" },
        TOGGLE: { target: "closed" },
    },
};

describe("StatelessMachine", () => {
    describe("resolve()", () => {
        it("returns next state when transition exists", () => {
            const m = createStatelessMachine({ transitions });

            expect(m.resolve("closed", { type: "OPEN" })).toBe("open");
            expect(m.resolve("open", { type: "CLOSE" })).toBe("closed");
            expect(m.resolve("closed", { type: "TOGGLE" })).toBe("open");
            expect(m.resolve("open", { type: "TOGGLE" })).toBe("closed");
        });

        it("returns null when transition missing", () => {
            const m = createStatelessMachine({ transitions });

            expect(m.resolve("closed", { type: "CLOSE" })).toBeNull();
            expect(m.resolve("open", { type: "OPEN" })).toBeNull();
        });

        it("returns null when guard blocks transition", () => {
            const guard = vi.fn(() => false);

            const _transitions: Transitions<TestStates, TestEvents> = {
                ...transitions,
                closed: {
                    ...transitions.closed,
                    OPEN: { target: "open", guard },
                },
            };

            const m = createStatelessMachine({ transitions: _transitions });

            expect(m.resolve("closed", { type: "OPEN" })).toBeNull();
            expect(guard).toHaveBeenCalledTimes(1);
            expect(guard).toHaveBeenCalledWith({ state: "closed", event: { type: "OPEN" } });
        });

        it("returns target when guard allows transition", () => {
            const guard = vi.fn(() => true);

            const _transitions: Transitions<TestStates, TestEvents> = {
                ...transitions,
                closed: {
                    ...transitions.closed,
                    OPEN: { target: "open", guard },
                },
            };

            const m = createStatelessMachine({ transitions: _transitions });

            expect(m.resolve("closed", { type: "OPEN" })).toBe("open");
            expect(guard).toHaveBeenCalledTimes(1);
        });
    });

    describe("can()", () => {
        it("is true when transition exists (and no guard)", () => {
            const m = createStatelessMachine({ transitions });

            expect(m.can("closed", { type: "OPEN" })).toBe(true);
            expect(m.can("open", { type: "CLOSE" })).toBe(true);
        });

        it("is false when transition missing", () => {
            const m = createStatelessMachine({ transitions });

            expect(m.can("closed", { type: "CLOSE" })).toBe(false);
            expect(m.can("open", { type: "OPEN" })).toBe(false);
        });

        it("respects guard", () => {
            const guardFalse = vi.fn(() => false);
            const guardTrue = vi.fn(() => true);

            const _transitions: Transitions<TestStates, TestEvents> = {
                ...transitions,
                closed: {
                    ...transitions.closed,
                    OPEN: { target: "open", guard: guardFalse },
                    TOGGLE: { target: "open", guard: guardTrue },
                },
            };

            const m = createStatelessMachine({ transitions: _transitions });

            expect(m.can("closed", { type: "OPEN" })).toBe(false);
            expect(m.can("closed", { type: "TOGGLE" })).toBe(true);

            expect(guardFalse).toHaveBeenCalledTimes(1);
            expect(guardTrue).toHaveBeenCalledTimes(1);
        });

        it("is consistent with resolve()", () => {
            const guard = vi.fn(({ event }: { state: TestStates; event: TestEvents }) => event.type !== "OPEN");

            const _transitions: Transitions<TestStates, TestEvents> = {
                ...transitions,
                closed: {
                    ...transitions.closed,
                    OPEN: { target: "open", guard },
                },
            };

            const m = createStatelessMachine({ transitions: _transitions });

            const evOpen: TestEvents = { type: "OPEN" };
            const evToggle: TestEvents = { type: "TOGGLE" };

            expect(m.can("closed", evOpen)).toBe(m.resolve("closed", evOpen) !== null);
            expect(m.can("closed", evToggle)).toBe(m.resolve("closed", evToggle) !== null);
        });
    });
});
