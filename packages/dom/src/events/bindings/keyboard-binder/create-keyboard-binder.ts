import { _KeyboardBinderImpl } from "./_KeyboardBinderImpl";

import type { KeyboardBinder, BinderOptions } from "@/events";

export function createKeyboardBinder<TTarget extends EventTarget = EventTarget>(
    options?: BinderOptions<TTarget>,
): KeyboardBinder<TTarget> {
    return new _KeyboardBinderImpl<TTarget>(options);
}
