import { describe, expect, it, vi } from "vitest";

import { type Transitions, createTransitionTable } from "@/transition-table";
import type { StateEventOf } from "@/types";

type DoorState = "closed" | "open" | "locked";
type DoorContext = {
    canOpen: boolean;
    toggles: number;
};
type DoorEvent = StateEventOf<"OPEN"> | StateEventOf<"CLOSE"> | StateEventOf<"TOGGLE"> | StateEventOf<"LOCK">;

const baseTransitions: Transitions<DoorState, DoorContext, DoorEvent> = {
    closed: {
        OPEN: {
            target: "open",
            guard: ({ context }) => context.canOpen,
        },
        TOGGLE: {
            target: "open",
            reduce: ({ context }) => ({ ...context, toggles: context.toggles + 1 }),
        },
        LOCK: {
            target: "locked",
        },
    },
    open: {
        CLOSE: {
            target: "closed",
        },
        TOGGLE: {
            target: "closed",
            reduce: ({ context }) => ({ ...context, toggles: context.toggles + 1 }),
        },
    },
    locked: {
        TOGGLE: {
            reduce: ({ context }) => ({ ...context, toggles: context.toggles + 1 }),
        },
    },
};

describe("createTransitionTable", () => {
    it("resolve() returns transition object for existing transition", () => {
        const table = createTransitionTable({ transitions: baseTransitions });
        const context: DoorContext = { canOpen: true, toggles: 0 };

        const transition = table.resolve("closed", context, { type: "OPEN" });

        expect(transition).toEqual({
            target: "open",
            guard: expect.any(Function),
        });
    });

    it("resolve() returns null when transition is missing", () => {
        const table = createTransitionTable({ transitions: baseTransitions });
        const context: DoorContext = { canOpen: true, toggles: 0 };

        expect(table.resolve("open", context, { type: "OPEN" })).toBeNull();
        expect(table.resolve("locked", context, { type: "LOCK" })).toBeNull();
    });

    it("resolve() evaluates guard with state/context/event and blocks transition when false", () => {
        const guard = vi.fn(
            ({ context }: { state: DoorState; context: DoorContext; event: DoorEvent }) => context.canOpen,
        );
        const table = createTransitionTable<DoorState, DoorContext, DoorEvent>({
            transitions: {
                ...baseTransitions,
                closed: {
                    ...baseTransitions.closed,
                    OPEN: {
                        target: "open",
                        guard,
                    },
                },
            },
        });

        const deniedContext: DoorContext = { canOpen: false, toggles: 0 };
        const allowedContext: DoorContext = { canOpen: true, toggles: 1 };

        expect(table.resolve("closed", deniedContext, { type: "OPEN" })).toBeNull();
        expect(table.resolve("closed", allowedContext, { type: "OPEN" })).toEqual({
            target: "open",
            guard,
        });

        expect(guard).toHaveBeenNthCalledWith(1, {
            state: "closed",
            context: deniedContext,
            event: { type: "OPEN" },
        });
        expect(guard).toHaveBeenNthCalledWith(2, {
            state: "closed",
            context: allowedContext,
            event: { type: "OPEN" },
        });
    });

    it("can() returns false for missing transition and guard=false", () => {
        const table = createTransitionTable({ transitions: baseTransitions });

        expect(table.can("open", { canOpen: true, toggles: 0 }, { type: "OPEN" })).toBe(false);
        expect(table.can("closed", { canOpen: false, toggles: 0 }, { type: "OPEN" })).toBe(false);
    });

    it("can() returns true when transition exists and guard allows", () => {
        const table = createTransitionTable({ transitions: baseTransitions });

        expect(table.can("closed", { canOpen: true, toggles: 0 }, { type: "OPEN" })).toBe(true);
        expect(table.can("locked", { canOpen: false, toggles: 0 }, { type: "TOGGLE" })).toBe(true);
    });

    it("supports internal transitions without target", () => {
        const table = createTransitionTable({ transitions: baseTransitions });
        const context: DoorContext = { canOpen: false, toggles: 3 };

        const transition = table.resolve("locked", context, { type: "TOGGLE" });

        expect(transition).toEqual({
            reduce: expect.any(Function),
        });
        expect(transition?.target).toBeUndefined();
        expect(transition?.reduce?.({ state: "locked", context, event: { type: "TOGGLE" } })).toEqual({
            canOpen: false,
            toggles: 4,
        });
    });

    it("can() does not invoke reduce()", () => {
        const reduce = vi.fn(({ context }: { state: DoorState; context: DoorContext; event: DoorEvent }) => context);
        const table = createTransitionTable<DoorState, DoorContext, DoorEvent>({
            transitions: {
                ...baseTransitions,
                locked: {
                    TOGGLE: {
                        reduce,
                    },
                },
            },
        });

        expect(table.can("locked", { canOpen: false, toggles: 0 }, { type: "TOGGLE" })).toBe(true);
        expect(reduce).not.toHaveBeenCalled();
    });
});
