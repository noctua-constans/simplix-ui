import type { EventListenerDisposer } from "@/events";

export interface FocusBinder<TTarget extends EventTarget = EventTarget> {
    bindFocus(
        target: TTarget,
        listener: (event: FocusEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer;

    bindBlur(
        target: TTarget,
        listener: (event: FocusEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer;

    bindFocusIn(
        target: TTarget,
        listener: (event: FocusEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer;

    bindFocusOut(
        target: TTarget,
        listener: (event: FocusEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer;
}
