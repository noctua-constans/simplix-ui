import { describe, expect, it, vi } from "vitest";

import { createMutableState } from "@/stateflow";

describe("createMutableState", () => {
    it("returns the initial value", () => {
        const state = createMutableState(42);

        expect(state.get()).toBe(42);
    });

    it("sets the next value and notifies subscribers", () => {
        const state = createMutableState(0);
        const listener = vi.fn();

        state.subscribe(listener);
        state.set(1);

        expect(state.get()).toBe(1);
        expect(listener).toHaveBeenCalledTimes(1);
    });

    it("does not notify when the next value is equal", () => {
        const state = createMutableState(Number.NaN);
        const listener = vi.fn();

        state.subscribe(listener);
        state.set(Number.NaN);

        expect(state.get()).toBeNaN();
        expect(listener).not.toHaveBeenCalled();
    });

    it("uses custom equality before setting the next value", () => {
        const state = createMutableState({ id: 1, label: "one" }, { equals: (a, b) => a.id === b.id });
        const listener = vi.fn();

        state.subscribe(listener);
        state.set({ id: 1, label: "updated" });

        expect(state.get()).toEqual({ id: 1, label: "one" });
        expect(listener).not.toHaveBeenCalled();

        state.set({ id: 2, label: "two" });

        expect(state.get()).toEqual({ id: 2, label: "two" });
        expect(listener).toHaveBeenCalledTimes(1);
    });

    it("updates from the current value", () => {
        const state = createMutableState(2);
        const updater = vi.fn((current: number) => current * 3);

        state.update(updater);

        expect(updater).toHaveBeenCalledWith(2);
        expect(state.get()).toBe(6);
    });

    it("stops notifying an unsubscribed listener", () => {
        const state = createMutableState(0);
        const listener = vi.fn();

        const unsubscribe = state.subscribe(listener);

        state.set(1);
        unsubscribe();
        state.set(2);

        expect(state.get()).toBe(2);
        expect(listener).toHaveBeenCalledTimes(1);
    });

    it("does not duplicate the same listener", () => {
        const state = createMutableState(0);
        const listener = vi.fn();

        const unsubscribeA = state.subscribe(listener);
        const unsubscribeB = state.subscribe(listener);

        state.set(1);
        unsubscribeA();
        state.set(2);
        unsubscribeB();
        state.set(3);

        expect(state.get()).toBe(3);
        expect(listener).toHaveBeenCalledTimes(1);
    });
});
