import tsconfigPaths from "vite-tsconfig-paths";

import { createVitestConfig } from "../.config/vitest.base";

export default createVitestConfig({
    plugins: [tsconfigPaths()],
});
