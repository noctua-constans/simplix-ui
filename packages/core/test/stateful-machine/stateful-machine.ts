import { describe, expect, it, vi } from "vitest";

import { createStatefulMachine } from "@/stateful-machine";
import { type Transitions, createTransitionTable } from "@/transition-table";
import type { StateEventOf } from "@/types";

type DoorState = "closed" | "open" | "locked";
type DoorContext = {
    canOpen: boolean;
    toggles: number;
};

type DoorEvent =
    | StateEventOf<"OPEN">
    | StateEventOf<"CLOSE">
    | StateEventOf<"TOGGLE">
    | StateEventOf<"LOCK">
    | StateEventOf<"UNLOCK">;

const transitions: Transitions<DoorState, DoorContext, DoorEvent> = {
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
        LOCK: {
            target: "locked",
        },
    },
    locked: {
        UNLOCK: {
            target: "closed",
        },
        TOGGLE: {
            reduce: ({ context }) => ({ ...context, toggles: context.toggles + 1 }),
        },
    },
};

function createMachine(initialState: DoorState = "closed", context: DoorContext = { canOpen: true, toggles: 0 }) {
    return createStatefulMachine({
        initialState,
        context,
        table: createTransitionTable({ transitions }),
    });
}

describe("createStatefulMachine", () => {
    it("starts from initial state and context", () => {
        const machine = createMachine("locked", { canOpen: false, toggles: 4 });

        expect(machine.get()).toEqual({ state: "locked", context: { canOpen: false, toggles: 4 } });
    });

    it("send() updates state when transition has target", () => {
        const machine = createMachine("closed", { canOpen: true, toggles: 0 });

        machine.send({ type: "OPEN" });

        expect(machine.get()).toEqual({ state: "open", context: { canOpen: true, toggles: 0 } });
    });

    it("send() updates context when transition has reduce only", () => {
        const machine = createMachine("locked", { canOpen: false, toggles: 1 });

        machine.send({ type: "TOGGLE" });

        expect(machine.get()).toEqual({ state: "locked", context: { canOpen: false, toggles: 2 } });
    });

    it("send() updates both state and context when transition has target+reduce", () => {
        const machine = createMachine("closed", { canOpen: true, toggles: 0 });

        machine.send({ type: "TOGGLE" });

        expect(machine.get()).toEqual({ state: "open", context: { canOpen: true, toggles: 1 } });
    });

    it("send() is no-op when transition is missing", () => {
        const machine = createMachine("closed", { canOpen: true, toggles: 2 });

        machine.send({ type: "CLOSE" });

        expect(machine.get()).toEqual({ state: "closed", context: { canOpen: true, toggles: 2 } });
    });

    it("send() is no-op when guard rejects transition", () => {
        const machine = createMachine("closed", { canOpen: false, toggles: 0 });

        machine.send({ type: "OPEN" });

        expect(machine.get()).toEqual({ state: "closed", context: { canOpen: false, toggles: 0 } });
    });

    it("send() does not notify when target and context are unchanged", () => {
        const resolve = vi.fn(() => ({
            target: "closed" as const,
            reduce: ({ context }: { context: DoorContext }) => context,
        }));
        const can = vi.fn(() => true);
        const listener = vi.fn();

        const machine = createStatefulMachine<DoorState, DoorContext, DoorEvent>({
            initialState: "closed",
            context: { canOpen: true, toggles: 0 },
            table: { resolve, can },
        });

        machine.subscribe(listener);
        machine.send({ type: "OPEN" });

        expect(listener).not.toHaveBeenCalled();
        expect(machine.get()).toEqual({ state: "closed", context: { canOpen: true, toggles: 0 } });
    });

    it("send() notifies when reducer returns a new context reference", () => {
        const machine = createMachine("locked", { canOpen: false, toggles: 1 });
        const listener = vi.fn();

        machine.subscribe(listener);
        machine.send({ type: "TOGGLE" });

        expect(listener).toHaveBeenCalledTimes(1);
        expect(machine.get()).toEqual({ state: "locked", context: { canOpen: false, toggles: 2 } });
    });

    it("can() checks transition using current state and context", () => {
        const machine = createMachine("closed", { canOpen: false, toggles: 0 });

        expect(machine.can({ type: "OPEN" })).toBe(false);

        machine.send({ type: "TOGGLE" });
        expect(machine.get().state).toBe("open");
        expect(machine.can({ type: "CLOSE" })).toBe(true);
    });

    it("subscribe() supports repeated unsubscribe", () => {
        const machine = createMachine();
        const listener = vi.fn();

        const unsubscribe = machine.subscribe(listener);
        unsubscribe();
        unsubscribe();
        machine.send({ type: "OPEN" });

        expect(listener).not.toHaveBeenCalled();
    });

    it("delegates send()/can() to transition table with current snapshot", () => {
        const resolve = vi.fn((state: DoorState, context: DoorContext, event: DoorEvent) => {
            if (state === "closed" && event.type === "OPEN") {
                return {
                    target: "open" as const,
                    reduce: () => ({ ...context, toggles: context.toggles + 1 }),
                };
            }
            return null;
        });
        const can = vi.fn((state: DoorState, context: DoorContext, event: DoorEvent) => {
            return state === "closed" && context.canOpen && event.type === "OPEN";
        });

        const machine = createStatefulMachine<DoorState, DoorContext, DoorEvent>({
            initialState: "closed",
            context: { canOpen: true, toggles: 1 },
            table: { resolve, can },
        });

        expect(machine.can({ type: "OPEN" })).toBe(true);
        expect(can).toHaveBeenCalledWith("closed", { canOpen: true, toggles: 1 }, { type: "OPEN" });

        machine.send({ type: "OPEN" });

        expect(resolve).toHaveBeenCalledWith("closed", { canOpen: true, toggles: 1 }, { type: "OPEN" });
        expect(machine.get()).toEqual({ state: "open", context: { canOpen: true, toggles: 2 } });
    });
});
