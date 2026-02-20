import { describe, expect, it, vi } from "vitest";

import { createStatefulMachine, createTransitionTable, type StateEventOf, type Transitions } from "../../src";

type MockState = "closed" | "open" | "locked";
type MockEvent = StateEventOf<"OPEN"> | StateEventOf<"CLOSE"> | StateEventOf<"LOCK"> | StateEventOf<"UNLOCK">;

const MockTransitions: Transitions<MockState, MockEvent> = {
    closed: {
        OPEN: { target: "open" },
        LOCK: { target: "locked" },
    },
    open: {
        CLOSE: { target: "closed" },
    },
    locked: {
        UNLOCK: { target: "closed" },
    },
};

describe("createStatefulMachine", () => {
    it("starts from initial state", () => {
        const table = createTransitionTable({ transitions: MockTransitions });
        const machine = createStatefulMachine<MockState, MockEvent>({
            initialState: "closed",
            table,
        });

        expect(machine.get()).toBe("closed");
    });

    it("send() moves to next state when transition exists", () => {
        const table = createTransitionTable({ transitions: MockTransitions });
        const machine = createStatefulMachine<MockState, MockEvent>({
            initialState: "closed",
            table,
        });

        machine.send({ type: "OPEN" });
        expect(machine.get()).toBe("open");

        machine.send({ type: "CLOSE" });
        expect(machine.get()).toBe("closed");
    });

    it("send() is a no-op when transition does not exist", () => {
        const table = createTransitionTable({ transitions: MockTransitions });
        const machine = createStatefulMachine<MockState, MockEvent>({
            initialState: "open",
            table,
        });

        machine.send({ type: "LOCK" });

        expect(machine.get()).toBe("open");
    });

    it("send() does not notify when table resolves null", () => {
        const resolve = vi.fn<(...args: [MockState, MockEvent]) => MockState | null>();
        resolve.mockReturnValue(null);
        const can = vi.fn<(...args: [MockState, MockEvent]) => boolean>();
        can.mockReturnValue(false);
        const listener = vi.fn();

        const machine = createStatefulMachine<MockState, MockEvent>({
            initialState: "closed",
            table: { resolve, can },
        });

        machine.subscribe(listener);
        machine.send({ type: "OPEN" });

        expect(machine.get()).toBe("closed");
        expect(listener).not.toHaveBeenCalled();
    });

    it("send() does not notify when table resolves to the same state", () => {
        const resolve = vi.fn<(...args: [MockState, MockEvent]) => MockState | null>();
        resolve.mockReturnValue("closed");
        const can = vi.fn<(...args: [MockState, MockEvent]) => boolean>();
        can.mockReturnValue(true);
        const listener = vi.fn();

        const machine = createStatefulMachine<MockState, MockEvent>({
            initialState: "closed",
            table: { resolve, can },
        });

        machine.subscribe(listener);
        machine.send({ type: "OPEN" });

        expect(machine.get()).toBe("closed");
        expect(listener).not.toHaveBeenCalled();
    });

    it("notifies subscribers on state changes", () => {
        const table = createTransitionTable({ transitions: MockTransitions });
        const machine = createStatefulMachine<MockState, MockEvent>({
            initialState: "closed",
            table,
        });
        const listener = vi.fn();

        machine.subscribe(listener);
        machine.send({ type: "OPEN" });

        expect(listener).toHaveBeenCalledTimes(1);
        expect(machine.get()).toBe("open");
    });

    it("unsubscribe stops notifications and can be called multiple times", () => {
        const table = createTransitionTable({ transitions: MockTransitions });
        const machine = createStatefulMachine<MockState, MockEvent>({
            initialState: "closed",
            table,
        });
        const listener = vi.fn();

        const unsubscribe = machine.subscribe(listener);
        unsubscribe();
        unsubscribe();
        machine.send({ type: "OPEN" });

        expect(listener).not.toHaveBeenCalled();
    });

    it("can() checks transitions for current state", () => {
        const table = createTransitionTable({ transitions: MockTransitions });
        const machine = createStatefulMachine<MockState, MockEvent>({
            initialState: "closed",
            table,
        });

        expect(machine.can({ type: "OPEN" })).toBe(true);
        expect(machine.can({ type: "UNLOCK" })).toBe(false);

        machine.send({ type: "LOCK" });
        expect(machine.get()).toBe("locked");
        expect(machine.can({ type: "UNLOCK" })).toBe(true);
        expect(machine.can({ type: "OPEN" })).toBe(false);
    });

    it("delegates to transition table with current state", () => {
        const resolve = vi.fn<(...args: [MockState, MockEvent]) => MockState | null>();
        resolve.mockReturnValue("open");
        const can = vi.fn<(...args: [MockState, MockEvent]) => boolean>();
        can.mockReturnValue(true);

        const machine = createStatefulMachine<MockState, MockEvent>({
            initialState: "closed",
            table: { resolve, can },
        });

        expect(machine.can({ type: "OPEN" })).toBe(true);
        expect(can).toHaveBeenCalledWith("closed", { type: "OPEN" });

        machine.send({ type: "OPEN" });
        expect(resolve).toHaveBeenCalledWith("closed", { type: "OPEN" });
        expect(machine.get()).toBe("open");
    });
});
