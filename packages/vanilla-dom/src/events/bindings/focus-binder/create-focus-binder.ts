import { FocusBinderImpl } from "./focus-binder.impl";

import type { BinderOptions, FocusBinder } from "@/events";

export function createFocusBinder<TTarget extends EventTarget = EventTarget>(
    options?: BinderOptions<TTarget>,
): FocusBinder<TTarget> {
    return new FocusBinderImpl<TTarget>(options);
}
