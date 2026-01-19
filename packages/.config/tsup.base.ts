import { defineConfig, type Options } from "tsup";

export type TsupPresetOptions = {
    entry?: string[];
    external?: string[];
    dts?: boolean;
};

export function createTsupConfig(options: TsupPresetOptions = {}) {
    const { entry = ["./src/index.ts"], external = [], dts = true } = options;

    const base: Options = {
        entry,
        format: ["esm", "cjs"],
        bundle: true,
        clean: true,
        dts,
        external,

        minify: true,
        minifyWhitespace: true,
        splitting: false,
        sourcemap: false,
        treeshake: true,
    };

    return defineConfig(base);
}
