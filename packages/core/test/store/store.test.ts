import { describe, expect, it, vi } from "vitest";

import { createStore } from "../../src";

describe("createStore", () => {
    it("returns initial value from get()", () => {
        const store = createStore(42);

        expect(store.get()).toBe(42);
    });

    it("set() updates value and notifies subscribers", () => {
        const store = createStore(0);
        const listener = vi.fn();

        store.subscribe(listener);
        store.set(1);

        expect(store.get()).toBe(1);
        expect(listener).toHaveBeenCalledTimes(1);
    });

    it("set() is no-op for equal values with default Object.is", () => {
        const store = createStore(1);
        const listener = vi.fn();

        store.subscribe(listener);
        store.set(1);

        expect(store.get()).toBe(1);
        expect(listener).not.toHaveBeenCalled();
    });

    it("set() respects custom equals", () => {
        const store = createStore({ id: 1, payload: "a" }, { equals: (a, b) => a.id === b.id });
        const listener = vi.fn();

        store.subscribe(listener);
        store.set({ id: 1, payload: "b" });

        expect(store.get()).toEqual({ id: 1, payload: "a" });
        expect(listener).not.toHaveBeenCalled();

        store.set({ id: 2, payload: "c" });

        expect(store.get()).toEqual({ id: 2, payload: "c" });
        expect(listener).toHaveBeenCalledTimes(1);
    });

    it("update() derives next value from previous", () => {
        const store = createStore(2);

        store.update((prev) => prev * 3);

        expect(store.get()).toBe(6);
    });

    it("update() does not notify when updater returns equal value", () => {
        const store = createStore(5);
        const listener = vi.fn();

        store.subscribe(listener);
        store.update((prev) => prev);

        expect(store.get()).toBe(5);
        expect(listener).not.toHaveBeenCalled();
    });

    it("unsubscribe stops notifications and can be called multiple times", () => {
        const store = createStore(0);
        const listener = vi.fn();

        const unsubscribe = store.subscribe(listener);
        unsubscribe();
        unsubscribe();
        store.set(1);

        expect(listener).not.toHaveBeenCalled();
    });

    it("keeps emit stable when listeners unsubscribe during notification", () => {
        const store = createStore(0);
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
});
