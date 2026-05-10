import { CleanupRegistryImpl } from "./cleanup-registry.impl";
import type { CleanupRegistry } from "./cleanup-registry.types";

export function createCleanupRegistry(): CleanupRegistry {
    return new CleanupRegistryImpl();
}
