import type { EventListenerDisposer } from "@/events";

export interface KeyboardBinder<TTarget extends EventTarget = EventTarget> {
    bindKeyDown(
        target: TTarget,
        listener: (event: KeyboardEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer;

    bindKeyUp(
        target: TTarget,
        listener: (event: KeyboardEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer;
}
