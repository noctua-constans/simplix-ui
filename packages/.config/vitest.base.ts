import { defineConfig } from "vitest/config";

export function createVitestConfig() {
    return defineConfig({
        test: {
            coverage: {
                provider: "v8",
                exclude: ["**/index.ts", "src/types/**"],
            },
            environment: "node",
            include: ["test/**/*.test.ts"],
            clearMocks: true,
            restoreMocks: true,
            mockReset: true,
        },
    });
}
