import { describe, expect, it, vi } from "vitest";

import { createMutableState } from "@/stateflow";

describe("createMutableState", () => {
    it("returns the initial snapshot", () => {
        const state = createMutableState({ initial: { value: 42 } });

        expect(state.get()).toStrictEqual({ value: 42 });
    });

    it("sets the next value and notifies subscribers with snapshot", () => {
        const state = createMutableState({ initial: { value: 0 } });
        const listener = vi.fn();

        state.subscribe(listener);

        const changed = state.set({ value: 1 });

        expect(changed).toBe(true);
        expect(state.get()).toStrictEqual({ value: 1 });
        expect(listener).toHaveBeenCalledTimes(1);
        expect(listener).toHaveBeenCalledWith({ value: 1 });
    });

    it("returns false and does not notify when the next value is equal by custom equality", () => {
        const state = createMutableState({
            initial: { value: Number.NaN },
            equals: (a, b) => Object.is(a.value, b.value),
        });

        const listener = vi.fn();

        state.subscribe(listener);

        const changed = state.set({ value: Number.NaN });

        expect(changed).toBe(false);
        expect(state.get()).toStrictEqual({ value: Number.NaN });
        expect(listener).not.toHaveBeenCalled();
    });

    it("uses custom equality before setting the next value", () => {
        const state = createMutableState({
            initial: { id: 1, label: "one" },
            equals: (a, b) => a.id === b.id,
        });

        const listener = vi.fn();

        state.subscribe(listener);

        const unchanged = state.set({ id: 1, label: "updated" });

        expect(unchanged).toBe(false);
        expect(state.get()).toStrictEqual({ id: 1, label: "one" });
        expect(listener).not.toHaveBeenCalled();

        const changed = state.set({ id: 2, label: "two" });

        expect(changed).toBe(true);
        expect(state.get()).toStrictEqual({ id: 2, label: "two" });
        expect(listener).toHaveBeenCalledTimes(1);
        expect(listener).toHaveBeenCalledWith({ id: 2, label: "two" });
    });

    it("updates from the current snapshot", () => {
        const state = createMutableState({ initial: { value: 2 } });
        const updater = vi.fn((current: { value: number }) => ({
            value: current.value * 3,
        }));

        const changed = state.update(updater);

        expect(changed).toBe(true);
        expect(updater).toHaveBeenCalledWith({ value: 2 });
        expect(state.get()).toStrictEqual({ value: 6 });
    });

    it("returns false from update when updater returns an equal value by custom equality", () => {
        const state = createMutableState({
            initial: { value: 2 },
            equals: (a, b) => Object.is(a.value, b.value),
        });

        const listener = vi.fn();
        const updater = vi.fn((current: { value: number }) => current);

        state.subscribe(listener);

        const changed = state.update(updater);

        expect(changed).toBe(false);
        expect(updater).toHaveBeenCalledWith({ value: 2 });
        expect(state.get()).toStrictEqual({ value: 2 });
        expect(listener).not.toHaveBeenCalled();
    });

    it("stops notifying an unsubscribed listener", () => {
        const state = createMutableState({ initial: { value: 0 } });
        const listener = vi.fn();

        const unsubscribe = state.subscribe(listener);

        state.set({ value: 1 });
        unsubscribe();
        state.set({ value: 2 });

        expect(state.get()).toStrictEqual({ value: 2 });
        expect(listener).toHaveBeenCalledTimes(1);
        expect(listener).toHaveBeenCalledWith({ value: 1 });
    });

    it("allows unsubscribe to be called more than once", () => {
        const state = createMutableState({ initial: { value: 0 } });
        const listener = vi.fn();

        const unsubscribe = state.subscribe(listener);

        unsubscribe();
        unsubscribe();

        state.set({ value: 1 });

        expect(state.get()).toStrictEqual({ value: 1 });
        expect(listener).not.toHaveBeenCalled();
    });

    it("does not duplicate the same listener", () => {
        const state = createMutableState({ initial: { value: 0 } });
        const listener = vi.fn();

        const unsubscribeA = state.subscribe(listener);
        const unsubscribeB = state.subscribe(listener);

        state.set({ value: 1 });
        unsubscribeA();
        state.set({ value: 2 });
        unsubscribeB();
        state.set({ value: 3 });

        expect(state.get()).toStrictEqual({ value: 3 });
        expect(listener).toHaveBeenCalledTimes(1);
        expect(listener).toHaveBeenCalledWith({ value: 1 });
    });

    it("allows a listener to unsubscribe itself during emit", () => {
        const state = createMutableState({ initial: { value: 0 } });

        let unsubscribe = () => {};

        const listener = vi.fn(() => {
            unsubscribe();
        });

        unsubscribe = state.subscribe(listener);

        state.set({ value: 1 });
        state.set({ value: 2 });

        expect(state.get()).toStrictEqual({ value: 2 });
        expect(listener).toHaveBeenCalledTimes(1);
        expect(listener).toHaveBeenCalledWith({ value: 1 });
    });

    it("continues notifying remaining listeners when one listener unsubscribes itself", () => {
        const state = createMutableState({ initial: { value: 0 } });

        let unsubscribeA = () => {};

        const listenerA = vi.fn(() => {
            unsubscribeA();
        });

        const listenerB = vi.fn();

        unsubscribeA = state.subscribe(listenerA);
        state.subscribe(listenerB);

        state.set({ value: 1 });
        state.set({ value: 2 });

        expect(listenerA).toHaveBeenCalledTimes(1);
        expect(listenerA).toHaveBeenCalledWith({ value: 1 });

        expect(listenerB).toHaveBeenCalledTimes(2);
        expect(listenerB).toHaveBeenNthCalledWith(1, { value: 1 });
        expect(listenerB).toHaveBeenNthCalledWith(2, { value: 2 });
    });

    it("does not notify a listener added during the same emit", () => {
        const state = createMutableState({ initial: { value: 0 } });

        const listenerB = vi.fn();

        const listenerA = vi.fn(() => {
            state.subscribe(listenerB);
        });

        state.subscribe(listenerA);

        state.set({ value: 1 });

        expect(listenerA).toHaveBeenCalledTimes(1);
        expect(listenerB).not.toHaveBeenCalled();

        state.set({ value: 2 });

        expect(listenerA).toHaveBeenCalledTimes(2);
        expect(listenerB).toHaveBeenCalledTimes(1);
        expect(listenerB).toHaveBeenCalledWith({ value: 2 });
    });

    it("does not expose mutable internal state reference through get", () => {
        const state = createMutableState({ initial: { value: 1 } });

        const snapshot = state.get();

        expect(Object.isFrozen(snapshot)).toBe(true);

        expect(() => {
            (snapshot as { value: number }).value = 999;
        }).toThrow();

        expect(state.get()).toStrictEqual({ value: 1 });
    });

    it("does not expose mutable internal state reference to listeners", () => {
        const state = createMutableState({ initial: { value: 0 } });

        const listener = vi.fn((snapshot: { value: number }) => {
            expect(Object.isFrozen(snapshot)).toBe(true);

            expect(() => {
                snapshot.value = 999;
            }).toThrow();
        });

        state.subscribe(listener);

        state.set({ value: 1 });

        expect(state.get()).toStrictEqual({ value: 1 });
    });
});
