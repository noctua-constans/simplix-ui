import { describe, expect, it, vi } from "vitest";

import { createControlModel } from "../../src";

describe("ControlModel", () => {
    describe("uncontrolled mode", () => {
        it("starts with defaultValue", () => {
            const cm = createControlModel({ defaultValue: 1 });
            expect(cm.get()).toBe(1);
        });

        it("set() updates value and notifies listeners", () => {
            const cm = createControlModel({ defaultValue: 0 });
            const listener = vi.fn();

            cm.subscribe(listener);
            cm.set(1);

            expect(cm.get()).toBe(1);
            expect(listener).toHaveBeenCalledTimes(1);
        });

        it("set() calls onChange only when value actually changed", () => {
            const onChange = vi.fn();
            const cm = createControlModel({ defaultValue: 1, onChange });

            cm.set(1);
            cm.set(2);

            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onChange).toHaveBeenCalledWith(2);
        });

        it("update(fn) derives next value from previous", () => {
            const cm = createControlModel({ defaultValue: 1 });

            cm.update((prev) => prev + 1);
            expect(cm.get()).toBe(2);
        });

        it("equals prevents redundant updates", () => {
            const listener = vi.fn();

            const cm = createControlModel({
                defaultValue: { a: 1 },
                equals: (a, b) => a.a === b.a,
            });

            cm.subscribe(listener);
            cm.set({ a: 1 });
            cm.set({ a: 2 });

            expect(listener).toHaveBeenCalledTimes(1);
            expect(cm.get()).toEqual({ a: 2 });
        });
    });

    describe("controlled mode", () => {
        it("uses value as source of truth", () => {
            const cm = createControlModel({ value: 10, onChange: () => {} });

            expect(cm.get()).toBe(10);
        });

        it("set() does not update internal state", () => {
            const onChange = vi.fn();
            const cm = createControlModel({ value: 5, onChange });

            cm.set(6);

            expect(cm.get()).toBe(5);
            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onChange).toHaveBeenCalledWith(6);
        });

        it("does not notify subscribers on set()", () => {
            const listener = vi.fn();

            const cm = createControlModel({ value: 1, onChange: () => {} });

            cm.subscribe(listener);
            cm.set(2);

            expect(listener).not.toHaveBeenCalled();
        });
    });

    describe("sync()", () => {
        it("updates value and notifies listeners", () => {
            const cm = createControlModel({ defaultValue: 0 });
            const listener = vi.fn();

            cm.subscribe(listener);
            const changed = cm.sync(1);

            expect(changed).toBe(true);
            expect(cm.get()).toBe(1);
            expect(listener).toHaveBeenCalledTimes(1);
        });

        it("returns false when value did not change", () => {
            const cm = createControlModel({ defaultValue: 1 });
            const listener = vi.fn();

            cm.subscribe(listener);
            const changed = cm.sync(1);

            expect(changed).toBe(false);
            expect(listener).not.toHaveBeenCalled();
        });

        it("warns in dev mode when called in controlled mode", () => {
            const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

            const cm = createControlModel({ value: 1, onChange: () => {} });

            cm.sync(2);

            expect(warn).toHaveBeenCalledTimes(1);
            warn.mockRestore();
        });
    });

    describe("subscribe()", () => {
        it("unsubscribe stops notifications", () => {
            const cm = createControlModel({ defaultValue: 0 });
            const listener = vi.fn();

            const unsubscribe = cm.subscribe(listener);
            unsubscribe();

            cm.set(1);
            expect(listener).not.toHaveBeenCalled();
        });
    });

    describe("configure()", () => {
        it("updates onChange handler", () => {
            const onChange1 = vi.fn();
            const onChange2 = vi.fn();

            const cm = createControlModel({ defaultValue: 0, onChange: onChange1 });

            cm.set(1);
            cm.configure({ onChange: onChange2 });
            cm.set(2);

            expect(onChange1).toHaveBeenCalledTimes(1);
            expect(onChange2).toHaveBeenCalledTimes(1);
            expect(onChange2).toHaveBeenCalledWith(2);
        });

        it("updates equals function", () => {
            const cm = createControlModel({ defaultValue: { x: 1 }, equals: () => false });

            cm.configure({ equals: (a, b) => a.x === b.x });

            const changed = cm.sync({ x: 1 });
            expect(changed).toBe(false);
        });
    });
});
