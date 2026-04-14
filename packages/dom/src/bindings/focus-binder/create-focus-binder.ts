import { _FocusBinderImpl } from "./_FocusBinderImpl";

import type { BinderOptions, FocusBinder } from "@/bindings";

export function createFocusBinder<TTarget extends EventTarget = EventTarget>(
    options?: BinderOptions<TTarget>,
): FocusBinder<TTarget> {
    return new _FocusBinderImpl<TTarget>(options);
}
