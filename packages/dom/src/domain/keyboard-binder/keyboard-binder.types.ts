import type { EventListenerDisposer, EventListener } from "@/events";

export type KeyboardBinderOptions<TTarget extends EventTarget = EventTarget> = {
    listener?: EventListener<TTarget>;
};

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
