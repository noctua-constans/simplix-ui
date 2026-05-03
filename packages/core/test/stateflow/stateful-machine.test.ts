import { describe, expect, it, vi } from "vitest";

import type { TestSchema } from "./stateflow.types";

import { createStatefulMachine, type TransitionTable } from "@/stateflow";

function createNullTable(): TransitionTable<TestSchema["STATE"], TestSchema["EVENT"], TestSchema["CONTEXT"]> {
    return {
        resolve: () => null,
        can: () => false,
    };
}

describe("createStatefulMachine", () => {
    it("exposes the initial state and context", () => {
        const machine = createStatefulMachine<TestSchema["STATE"], TestSchema["EVENT"], TestSchema["CONTEXT"]>({
            initialState: "idle",
            context: { enabled: true, attempts: 1 },
            table: createNullTable(),
        });

        expect(machine.get()).toEqual({ state: "idle", context: { enabled: true, attempts: 1 } });
    });

    it("delegates send to the transition table and applies the resolved transition", () => {
        const resolveSpy = vi.fn();
        const listener = vi.fn();
        const table: TransitionTable<TestSchema["STATE"], TestSchema["EVENT"], TestSchema["CONTEXT"]> = {
            resolve: (state, context, event) => {
                resolveSpy(state, context, event);

                return {
                    target: "running",
                    reduce: ({ context: current }) => ({ ...current, attempts: current.attempts + 1 }),
                };
            },
            can: () => false,
        };
        const machine = createStatefulMachine<TestSchema["STATE"], TestSchema["EVENT"], TestSchema["CONTEXT"]>({
            initialState: "idle",
            context: { enabled: true, attempts: 1 },
            table,
        });

        machine.subscribe(listener);
        machine.send({ type: "START" });

        expect(resolveSpy).toHaveBeenCalledWith("idle", { type: "START" }, { enabled: true, attempts: 1 });
        expect(machine.get()).toEqual({ state: "running", context: { enabled: true, attempts: 2 } });
        expect(listener).toHaveBeenCalledTimes(1);
    });

    it("keeps the current context when the resolved transition has no reducer", () => {
        const context = { enabled: true, attempts: 1 };
        const table: TransitionTable<TestSchema["STATE"], TestSchema["EVENT"], TestSchema["CONTEXT"]> = {
            resolve: () => ({
                target: "running",
            }),
            can: () => true,
        };
        const machine = createStatefulMachine<TestSchema["STATE"], TestSchema["EVENT"], TestSchema["CONTEXT"]>({
            initialState: "idle",
            context,
            table,
        });

        machine.send({ type: "START" });

        expect(machine.get()).toEqual({ state: "running", context });
        expect(machine.get().context).toBe(context);
    });

    it("does nothing when the transition table returns no transition", () => {
        const listener = vi.fn();
        const machine = createStatefulMachine<TestSchema["STATE"], TestSchema["EVENT"], TestSchema["CONTEXT"]>({
            initialState: "idle",
            context: { enabled: true, attempts: 1 },
            table: createNullTable(),
        });

        machine.subscribe(listener);
        machine.send({ type: "STOP" });

        expect(machine.get()).toEqual({ state: "idle", context: { enabled: true, attempts: 1 } });
        expect(listener).not.toHaveBeenCalled();
    });

    it("does not notify when the resolved transition leaves the snapshot unchanged", () => {
        const context = { enabled: true, attempts: 1 };
        const listener = vi.fn();
        const table: TransitionTable<TestSchema["STATE"], TestSchema["EVENT"], TestSchema["CONTEXT"]> = {
            resolve: () => ({
                target: "idle",
                reduce: () => context,
            }),
            can: () => true,
        };
        const machine = createStatefulMachine<TestSchema["STATE"], TestSchema["EVENT"], TestSchema["CONTEXT"]>({
            initialState: "idle",
            context,
            table,
        });

        machine.subscribe(listener);
        machine.send({ type: "RETRY" });

        expect(machine.get()).toEqual({ state: "idle", context });
        expect(listener).not.toHaveBeenCalled();
    });

    it("delegates can to the transition table with the current snapshot", () => {
        const canSpy = vi.fn(
            (_state: TestSchema["STATE"], _event: TestSchema["EVENT"], _context: TestSchema["CONTEXT"]) => true,
        );
        const table: TransitionTable<TestSchema["STATE"], TestSchema["EVENT"], TestSchema["CONTEXT"]> = {
            resolve: () => null,
            can: (state, event, context) => canSpy(state, event, context),
        };
        const machine = createStatefulMachine<TestSchema["STATE"], TestSchema["EVENT"], TestSchema["CONTEXT"]>({
            initialState: "running",
            context: { enabled: false, attempts: 3 },
            table,
        });

        expect(machine.can({ type: "STOP" })).toBe(true);
        expect(canSpy).toHaveBeenCalledWith("running", { type: "STOP" }, { enabled: false, attempts: 3 });
    });

    it("uses the updated snapshot when checking can after send", () => {
        const canSpy = vi.fn(
            (state: TestSchema["STATE"], event: TestSchema["EVENT"], _context: TestSchema["CONTEXT"]) => {
                return state === "running" && event.type === "STOP";
            },
        );
        const table: TransitionTable<TestSchema["STATE"], TestSchema["EVENT"], TestSchema["CONTEXT"]> = {
            resolve: () => ({
                target: "running",
            }),
            can: (state, event, context) => canSpy(state, event, context),
        };
        const machine = createStatefulMachine<TestSchema["STATE"], TestSchema["EVENT"], TestSchema["CONTEXT"]>({
            initialState: "idle",
            context: { enabled: true, attempts: 0 },
            table,
        });

        machine.send({ type: "START" });

        expect(machine.can({ type: "STOP" })).toBe(true);
        expect(canSpy).toHaveBeenCalledWith("running", { type: "STOP" }, { enabled: true, attempts: 0 });
    });

    it("returns an unsubscribe function from subscribe", () => {
        const listener = vi.fn();
        const table: TransitionTable<TestSchema["STATE"], TestSchema["EVENT"], TestSchema["CONTEXT"]> = {
            resolve: () => ({
                reduce: ({ context }) => ({ ...context, attempts: context.attempts + 1 }),
            }),
            can: () => true,
        };
        const machine = createStatefulMachine<TestSchema["STATE"], TestSchema["EVENT"], TestSchema["CONTEXT"]>({
            initialState: "idle",
            context: { enabled: true, attempts: 0 },
            table,
        });

        const unsubscribe = machine.subscribe(listener);

        unsubscribe();
        machine.send({ type: "RETRY" });

        expect(machine.get()).toEqual({ state: "idle", context: { enabled: true, attempts: 1 } });
        expect(listener).not.toHaveBeenCalled();
    });
});
