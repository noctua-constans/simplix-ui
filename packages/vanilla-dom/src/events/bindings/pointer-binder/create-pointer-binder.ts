import { PointerBinderImpl } from "./pointer-binder.impl";

import type { BinderOptions, PointerBinder } from "@/events";

export function createPointerBinder<TTarget extends EventTarget = EventTarget>(
    options?: BinderOptions<TTarget>,
): PointerBinder<TTarget> {
    return new PointerBinderImpl<TTarget>(options);
}
