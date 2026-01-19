import { defineConfig } from "vitest/config";

export function createVitestConfig() {
    return defineConfig({
        test: {
            environment: "node",
            include: ["test/**/*.test.ts"],
            clearMocks: true,
            restoreMocks: true,
            mockReset: true,
        },
    });
}
