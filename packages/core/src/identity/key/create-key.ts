import { _KeyImpl } from "./_KeyImpl";

import type { Key, KeyOptions } from "@/identity";

export function createKey(options?: KeyOptions): Key {
    return new _KeyImpl(options);
}
