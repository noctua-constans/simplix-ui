import { defineConfig, type ViteUserConfig } from "vitest/config";

export function createVitestConfig(additional?: ViteUserConfig) {
    return defineConfig({
        test: {
            coverage: {
                provider: "v8",
                exclude: ["**/index.ts", "**/*.types.ts"],
            },
            environment: "node",
            include: ["test/**/*.ts"],
            clearMocks: true,
            restoreMocks: true,
            mockReset: true,
        },
        ...additional,
    });
}
