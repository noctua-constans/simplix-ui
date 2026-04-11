import { describe, expect, it, vi } from "vitest";

import { createMutableState } from "@/mutable-state";

describe("createMutableState", () => {
    it("returns initial value from get()", () => {
        const state = createMutableState(42);

        expect(state.get()).toBe(42);
    });

    it("set() updates value and notifies subscribers", () => {
        const state = createMutableState(0);
        const listener = vi.fn();

        state.subscribe(listener);
        state.set(1);

        expect(state.get()).toBe(1);
        expect(listener).toHaveBeenCalledTimes(1);
    });

    it("set() follows Object.is semantics (NaN equal, -0 and +0 different)", () => {
        const state = createMutableState(Number.NaN);
        const listener = vi.fn();

        state.subscribe(listener);
        state.set(Number.NaN);
        expect(listener).toHaveBeenCalledTimes(0);

        state.set(-0);
        expect(listener).toHaveBeenCalledTimes(1);

        state.set(+0);
        expect(listener).toHaveBeenCalledTimes(2);
    });

    it("set() respects custom equals", () => {
        const state = createMutableState({ id: 1, payload: "a" }, { equals: (a, b) => a.id === b.id });
        const listener = vi.fn();

        state.subscribe(listener);
        state.set({ id: 1, payload: "b" });

        expect(state.get()).toEqual({ id: 1, payload: "a" });
        expect(listener).not.toHaveBeenCalled();

        state.set({ id: 2, payload: "c" });

        expect(state.get()).toEqual({ id: 2, payload: "c" });
        expect(listener).toHaveBeenCalledTimes(1);
    });

    it("update() receives previous value and sets the returned value", () => {
        const state = createMutableState(2);
        const updater = vi.fn((prev: number) => prev * 3);

        state.update(updater);

        expect(updater).toHaveBeenCalledWith(2);
        expect(state.get()).toBe(6);
    });

    it("does not duplicate notifications when subscribing same listener twice", () => {
        const state = createMutableState(0);
        const listener = vi.fn();

        const unsubscribeA = state.subscribe(listener);
        const unsubscribeB = state.subscribe(listener);

        state.set(1);
        expect(listener).toHaveBeenCalledTimes(1);

        unsubscribeA();
        state.set(2);
        expect(listener).toHaveBeenCalledTimes(1);

        unsubscribeB();
        state.set(3);
        expect(listener).toHaveBeenCalledTimes(1);
    });

    it("keeps emit stable when listeners unsubscribe during notification", () => {
        const state = createMutableState(0);
        const listenerA = vi.fn();
        const listenerB = vi.fn();

        const unsubscribeA = state.subscribe(() => {
            listenerA();
            unsubscribeA();
        });
        state.subscribe(listenerB);

        state.set(1);

        expect(listenerA).toHaveBeenCalledTimes(1);
        expect(listenerB).toHaveBeenCalledTimes(1);

        state.set(2);

        expect(listenerA).toHaveBeenCalledTimes(1);
        expect(listenerB).toHaveBeenCalledTimes(2);
    });

    it("does not notify listeners added during ongoing emission until next update", () => {
        const state = createMutableState(0);
        const lateListener = vi.fn();

        state.subscribe(() => {
            state.subscribe(lateListener);
        });

        state.set(1);
        expect(lateListener).not.toHaveBeenCalled();

        state.set(2);
        expect(lateListener).toHaveBeenCalledTimes(1);
    });
});
