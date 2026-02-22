import { describe, expect, it, vi } from "vitest";

import { createWritableStore } from "../../src";

describe("createWritableStore", () => {
    it("returns initial value from get()", () => {
        const store = createWritableStore(42);

        expect(store.get()).toBe(42);
    });

    it("set() updates value and notifies subscribers", () => {
        const store = createWritableStore(0);
        const listener = vi.fn();

        store.subscribe(listener);
        store.set(1);

        expect(store.get()).toBe(1);
        expect(listener).toHaveBeenCalledTimes(1);
    });

    it("set() follows Object.is semantics (NaN equal, -0 and +0 different)", () => {
        const store = createWritableStore(Number.NaN);
        const listener = vi.fn();

        store.subscribe(listener);
        store.set(Number.NaN);
        expect(listener).toHaveBeenCalledTimes(0);

        store.set(-0);
        expect(listener).toHaveBeenCalledTimes(1);

        store.set(+0);
        expect(listener).toHaveBeenCalledTimes(2);
    });

    it("set() respects custom equals", () => {
        const store = createWritableStore({ id: 1, payload: "a" }, { equals: (a, b) => a.id === b.id });
        const listener = vi.fn();

        store.subscribe(listener);
        store.set({ id: 1, payload: "b" });

        expect(store.get()).toEqual({ id: 1, payload: "a" });
        expect(listener).not.toHaveBeenCalled();

        store.set({ id: 2, payload: "c" });

        expect(store.get()).toEqual({ id: 2, payload: "c" });
        expect(listener).toHaveBeenCalledTimes(1);
    });

    it("update() receives previous value and sets the returned value", () => {
        const store = createWritableStore(2);
        const updater = vi.fn((prev: number) => prev * 3);

        store.update(updater);

        expect(updater).toHaveBeenCalledWith(2);
        expect(store.get()).toBe(6);
    });

    it("does not duplicate notifications when subscribing same listener twice", () => {
        const store = createWritableStore(0);
        const listener = vi.fn();

        const unsubscribeA = store.subscribe(listener);
        const unsubscribeB = store.subscribe(listener);

        store.set(1);
        expect(listener).toHaveBeenCalledTimes(1);

        unsubscribeA();
        store.set(2);
        expect(listener).toHaveBeenCalledTimes(1);

        unsubscribeB();
        store.set(3);
        expect(listener).toHaveBeenCalledTimes(1);
    });

    it("keeps emit stable when listeners unsubscribe during notification", () => {
        const store = createWritableStore(0);
        const listenerA = vi.fn();
        const listenerB = vi.fn();

        const unsubscribeA = store.subscribe(() => {
            listenerA();
            unsubscribeA();
        });
        store.subscribe(listenerB);

        store.set(1);

        expect(listenerA).toHaveBeenCalledTimes(1);
        expect(listenerB).toHaveBeenCalledTimes(1);

        store.set(2);

        expect(listenerA).toHaveBeenCalledTimes(1);
        expect(listenerB).toHaveBeenCalledTimes(2);
    });

    it("does not notify listeners added during ongoing emission until next update", () => {
        const store = createWritableStore(0);
        const lateListener = vi.fn();

        store.subscribe(() => {
            store.subscribe(lateListener);
        });

        store.set(1);
        expect(lateListener).not.toHaveBeenCalled();

        store.set(2);
        expect(lateListener).toHaveBeenCalledTimes(1);
    });
});
