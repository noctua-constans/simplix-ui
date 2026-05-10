import { KeyImpl } from "./key.impl";
import type { Key, KeyOptions } from "./key.types";

export function createKey(options?: KeyOptions): Key {
    return new KeyImpl(options);
}
