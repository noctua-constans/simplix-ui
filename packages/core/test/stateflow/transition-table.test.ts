import { describe, expect, it, vi } from "vitest";

import type { TestContext, TestEvent, TestState } from "./stateflow.types";

import { createTransitionTable, type Transitions } from "@/stateflow";

describe("createTransitionTable", () => {
    it("resolves an existing transition", () => {
        const transition = { target: "running" as const };
        const table = createTransitionTable<TestState, TestContext, TestEvent>({
            transitions: {
                idle: {
                    START: transition,
                },
                running: {},
                done: {},
            },
        });

        expect(table.resolve("idle", { enabled: true, attempts: 0 }, { type: "START" })).toBe(transition);
    });

    it("returns null when a transition is missing", () => {
        const table = createTransitionTable<TestState, TestContext, TestEvent>({
            transitions: {
                idle: {},
                running: {},
                done: {},
            },
        });

        expect(table.resolve("idle", { enabled: true, attempts: 0 }, { type: "FINISH" })).toBeNull();
        expect(table.can("idle", { enabled: true, attempts: 0 }, { type: "FINISH" })).toBe(false);
    });

    it("uses guards to allow or reject transitions", () => {
        const guard = vi.fn(({ context }: { state: TestState; context: TestContext; event: TestEvent }) => {
            return context.enabled;
        });
        const transition = { target: "running" as const, guard };
        const table = createTransitionTable<TestState, TestContext, TestEvent>({
            transitions: {
                idle: {
                    START: transition,
                },
                running: {},
                done: {},
            },
        });
        const blocked = { enabled: false, attempts: 0 };
        const allowed = { enabled: true, attempts: 0 };

        expect(table.resolve("idle", blocked, { type: "START" })).toBeNull();
        expect(table.can("idle", blocked, { type: "START" })).toBe(false);
        expect(table.resolve("idle", allowed, { type: "START" })).toBe(transition);
        expect(table.can("idle", allowed, { type: "START" })).toBe(true);
        expect(guard).toHaveBeenCalledWith({
            state: "idle",
            context: blocked,
            event: { type: "START" },
        });
        expect(guard).toHaveBeenCalledWith({
            state: "idle",
            context: allowed,
            event: { type: "START" },
        });
    });

    it("returns reducers as transition data without running them", () => {
        const reduce = vi.fn(({ context }: { state: TestState; context: TestContext; event: TestEvent }) => {
            return { ...context, attempts: context.attempts + 1 };
        });
        const transition = {
            reduce,
        };
        const transitions: Transitions<TestState, TestContext, TestEvent> = {
            idle: {},
            running: {
                RETRY: transition,
            },
            done: {},
        };
        const table = createTransitionTable({ transitions });
        const context = { enabled: false, attempts: 1 };

        expect(table.resolve("running", context, { type: "RETRY" })).toBe(transition);
        expect(table.can("running", context, { type: "RETRY" })).toBe(true);
        expect(reduce).not.toHaveBeenCalled();
    });
});
