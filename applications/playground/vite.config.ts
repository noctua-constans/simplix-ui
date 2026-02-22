import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@simplix/core": fileURLToPath(new URL("../../packages/core/src/index.ts", import.meta.url)),
            "@simplix/headless": fileURLToPath(new URL("../../packages/headless/src/index.ts", import.meta.url)),
            "@simplix/react": fileURLToPath(new URL("../../packages/ui/react/src/index.ts", import.meta.url)),
        },
    },
});
