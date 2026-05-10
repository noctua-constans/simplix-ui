import { defineConfig, type Options } from "tsup";

export type TsupPresetOptions = {
    entry?: Record<string, string>;
    external?: string[];
};

export function createTsupConfig(options: TsupPresetOptions = {}) {
    const { entry = { index: "./src/index.ts" }, external = [] } = options;

    const base: Options = {
        entry,
        format: ["esm", "cjs"],
        bundle: true,
        clean: true,
        dts: true,
        external,

        minify: true,
        minifyWhitespace: true,
        splitting: false,
        sourcemap: false,
        treeshake: true,
    };

    return defineConfig(base);
}
