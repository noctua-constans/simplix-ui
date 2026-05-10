import { KeyboardBinderImpl } from "./keyboard-binder.impl";

import type { KeyboardBinder, BinderOptions } from "@/events";

export function createKeyboardBinder<TTarget extends EventTarget = EventTarget>(
    options?: BinderOptions<TTarget>,
): KeyboardBinder<TTarget> {
    return new KeyboardBinderImpl<TTarget>(options);
}
