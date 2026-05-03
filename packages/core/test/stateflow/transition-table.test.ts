import { describe, expect, it, vi } from "vitest";

import type { TestSchema } from "./stateflow.types";

import { createTransitionTable, type Transitions } from "@/stateflow";

describe("createTransitionTable", () => {
    it("resolves an existing transition", () => {
        const transition = { target: "running" as const };
        const table = createTransitionTable<TestSchema["STATE"], TestSchema["EVENT"], TestSchema["CONTEXT"]>({
            idle: {
                START: transition,
            },
            running: {},
            done: {},
        });

        expect(table.resolve("idle", { type: "START" }, { enabled: true, attempts: 0 })).toBe(transition);
    });

    it("returns null when a transition is missing", () => {
        const table = createTransitionTable<TestSchema["STATE"], TestSchema["EVENT"], TestSchema["CONTEXT"]>({
            idle: {},
            running: {},
            done: {},
        });

        expect(table.resolve("idle", { type: "FINISH" }, { enabled: true, attempts: 0 })).toBeNull();
        expect(table.can("idle", { type: "FINISH" }, { enabled: true, attempts: 0 })).toBe(false);
    });

    it("uses guards to allow or reject transitions", () => {
        const guard = vi.fn(
            ({
                context,
            }: {
                state: TestSchema["STATE"];
                context: TestSchema["CONTEXT"];
                event: TestSchema["EVENT"];
            }) => {
                return context.enabled;
            },
        );
        const transition = { target: "running" as const, guard };
        const table = createTransitionTable<TestSchema["STATE"], TestSchema["EVENT"], TestSchema["CONTEXT"]>({
            idle: {
                START: transition,
            },
            running: {},
            done: {},
        });
        const blocked = { enabled: false, attempts: 0 };
        const allowed = { enabled: true, attempts: 0 };

        expect(table.resolve("idle", { type: "START" }, blocked)).toBeNull();
        expect(table.can("idle", { type: "START" }, blocked)).toBe(false);
        expect(table.resolve("idle", { type: "START" }, allowed)).toBe(transition);
        expect(table.can("idle", { type: "START" }, allowed)).toBe(true);
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
        const reduce = vi.fn(
            ({
                context,
            }: {
                state: TestSchema["STATE"];
                context: TestSchema["CONTEXT"];
                event: TestSchema["EVENT"];
            }) => {
                return { ...context, attempts: context.attempts + 1 };
            },
        );
        const transition = {
            reduce,
        };
        const transitions: Transitions<TestSchema["STATE"], TestSchema["EVENT"], TestSchema["CONTEXT"]> = {
            idle: {},
            running: {
                RETRY: transition,
            },
            done: {},
        };
        const table = createTransitionTable(transitions);
        const context = { enabled: false, attempts: 1 };

        expect(table.resolve("running", { type: "RETRY" }, context)).toBe(transition);
        expect(table.can("running", { type: "RETRY" }, context)).toBe(true);
        expect(reduce).not.toHaveBeenCalled();
    });
});
