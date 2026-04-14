import { _IdImpl } from "./_IdImpl";

import type { IdOptions, Id } from "@/identity";

export function createId(options?: IdOptions): Id {
    return new _IdImpl(options);
}
