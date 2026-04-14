import type { EventListenerDisposer } from "@/events";

export interface PointerBinder<TTarget extends EventTarget = EventTarget> {
    bindPointerDown(
        target: TTarget,
        listener: (event: PointerEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer;

    bindPointerUp(
        target: TTarget,
        listener: (event: PointerEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer;

    bindPointerMove(
        target: TTarget,
        listener: (event: PointerEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer;

    bindPointerEnter(
        target: TTarget,
        listener: (event: PointerEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer;

    bindPointerLeave(
        target: TTarget,
        listener: (event: PointerEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer;

    bindPointerCancel(
        target: TTarget,
        listener: (event: PointerEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer;
}
