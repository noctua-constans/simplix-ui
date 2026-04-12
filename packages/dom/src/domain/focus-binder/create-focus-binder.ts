import { _FocusBinderImpl } from "./_FocusBinderImpl";

import type { BinderOptions, FocusBinder } from "@/domain";

export function createFocusBinder<TTarget extends EventTarget = EventTarget>(
    options?: BinderOptions<TTarget>,
): FocusBinder<TTarget> {
    return new _FocusBinderImpl<TTarget>(options);
}
