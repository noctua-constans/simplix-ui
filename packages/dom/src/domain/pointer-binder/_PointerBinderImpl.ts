import { type PointerBinder, type BinderOptions } from "@/domain";
import { type EventListener, createEventListener, type EventListenerDisposer } from "@/events";

export class _PointerBinderImpl<TTarget extends EventTarget = EventTarget> implements PointerBinder<TTarget> {
    readonly #listener: EventListener<TTarget>;

    constructor(options?: BinderOptions<TTarget>) {
        this.#listener = options?.listener ?? createEventListener();
    }

    bindPointerDown(
        target: TTarget,
        listener: (event: PointerEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer {
        return this.#listener.bind(target, "pointerdown", listener, options);
    }

    bindPointerUp(
        target: TTarget,
        listener: (event: PointerEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer {
        return this.#listener.bind(target, "pointerup", listener, options);
    }

    bindPointerMove(
        target: TTarget,
        listener: (event: PointerEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer {
        return this.#listener.bind(target, "pointermove", listener, options);
    }

    bindPointerEnter(
        target: TTarget,
        listener: (event: PointerEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer {
        return this.#listener.bind(target, "pointerenter", listener, options);
    }

    bindPointerLeave(
        target: TTarget,
        listener: (event: PointerEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer {
        return this.#listener.bind(target, "pointerleave", listener, options);
    }

    bindPointerCancel(
        target: TTarget,
        listener: (event: PointerEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer {
        return this.#listener.bind(target, "pointercancel", listener, options);
    }
}
