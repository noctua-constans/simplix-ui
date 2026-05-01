import { createVitestConfig } from "../.config/vitest.base";

export default createVitestConfig({
    resolve: {
        tsconfigPaths: true,
    },
});
