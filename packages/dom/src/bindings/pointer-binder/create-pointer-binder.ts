import { _PointerBinderImpl } from "./_PointerBinderImpl";

import type { BinderOptions, PointerBinder } from "@/bindings";

export function createPointerBinder<TTarget extends EventTarget = EventTarget>(
    options?: BinderOptions<TTarget>,
): PointerBinder<TTarget> {
    return new _PointerBinderImpl<TTarget>(options);
}
