import { describe, expect, it, vi } from "vitest";

import { createCleanupRegistry } from "@/lifecycle";

describe("createCleanupRegistry", () => {
    it("runs registered cleanups when destroyed", () => {
        const registry = createCleanupRegistry();
        const cleanupA = vi.fn();
        const cleanupB = vi.fn();

        registry.add(cleanupA);
        registry.add(cleanupB);
        registry.dispose();

        expect(cleanupA).toHaveBeenCalledTimes(1);
        expect(cleanupB).toHaveBeenCalledTimes(1);
    });

    it("does not run cleanups again when destroyed multiple times", () => {
        const registry = createCleanupRegistry();
        const cleanup = vi.fn();

        registry.add(cleanup);
        registry.dispose();
        registry.dispose();

        expect(cleanup).toHaveBeenCalledTimes(1);
    });

    it("runs and removes a cleanup when the returned disposer is called", () => {
        const registry = createCleanupRegistry();
        const cleanup = vi.fn();

        const dispose = registry.add(cleanup);

        dispose();
        registry.dispose();

        expect(cleanup).toHaveBeenCalledTimes(1);
    });

    it("does not run the same disposer more than once", () => {
        const registry = createCleanupRegistry();
        const cleanup = vi.fn();

        const dispose = registry.add(cleanup);

        dispose();
        dispose();
        registry.dispose();

        expect(cleanup).toHaveBeenCalledTimes(1);
    });

    it("runs cleanups added after destroy immediately", () => {
        const registry = createCleanupRegistry();
        const cleanup = vi.fn();

        registry.dispose();
        const dispose = registry.add(cleanup);
        dispose();

        expect(cleanup).toHaveBeenCalledTimes(1);
    });

    it("does not duplicate the same cleanup on destroy", () => {
        const registry = createCleanupRegistry();
        const cleanup = vi.fn();

        registry.add(cleanup);
        registry.add(cleanup);
        registry.dispose();

        expect(cleanup).toHaveBeenCalledTimes(1);
    });
});
