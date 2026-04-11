import { _KeyboardBinderImpl } from "./_KeyboardBinderImpl";

import type { KeyboardBinder, KeyboardBinderOptions } from "@/domain";

export function createKeyboardBinder<TTarget extends EventTarget = EventTarget>(
    options?: KeyboardBinderOptions<TTarget>,
): KeyboardBinder<TTarget> {
    return new _KeyboardBinderImpl<TTarget>(options);
}
