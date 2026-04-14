import type { KeyboardBinder, BinderOptions } from "@/bindings";
import { type EventListenerDisposer, type EventListener, createEventListener } from "@/events";

export class _KeyboardBinderImpl<TTarget extends EventTarget = EventTarget> implements KeyboardBinder<TTarget> {
    readonly #listener: EventListener<TTarget>;

    constructor(options: BinderOptions<TTarget> = {}) {
        const { listener = createEventListener() } = options;
        this.#listener = listener;
    }

    bindKeyDown(
        target: TTarget,
        listener: (event: KeyboardEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer {
        return this.#listener.add(target, "keydown", listener, options);
    }

    bindKeyUp(
        target: TTarget,
        listener: (event: KeyboardEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer {
        return this.#listener.add(target, "keyup", listener, options);
    }
}
