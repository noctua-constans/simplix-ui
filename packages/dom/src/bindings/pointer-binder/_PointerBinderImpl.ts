import { type BinderOptions, type PointerBinder } from "@/bindings";
import { createEventListener, type EventListener, type EventListenerDisposer } from "@/events";

export class _PointerBinderImpl<TTarget extends EventTarget = EventTarget> implements PointerBinder<TTarget> {
    readonly #listener: EventListener<TTarget>;

    constructor(options: BinderOptions<TTarget> = {}) {
        const { listener = createEventListener() } = options;
        this.#listener = listener;
    }

    bindPointerDown(
        target: TTarget,
        listener: (event: PointerEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer {
        return this.#listener.add(target, "pointerdown", listener, options);
    }

    bindPointerUp(
        target: TTarget,
        listener: (event: PointerEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer {
        return this.#listener.add(target, "pointerup", listener, options);
    }

    bindPointerMove(
        target: TTarget,
        listener: (event: PointerEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer {
        return this.#listener.add(target, "pointermove", listener, options);
    }

    bindPointerEnter(
        target: TTarget,
        listener: (event: PointerEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer {
        return this.#listener.add(target, "pointerenter", listener, options);
    }

    bindPointerLeave(
        target: TTarget,
        listener: (event: PointerEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer {
        return this.#listener.add(target, "pointerleave", listener, options);
    }

    bindPointerCancel(
        target: TTarget,
        listener: (event: PointerEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer {
        return this.#listener.add(target, "pointercancel", listener, options);
    }
}
