import { createTsupConfig } from "../../.config/tsup.base";

export default createTsupConfig({
    external: ["react", "react-dom"],
});
