import type { KeyboardBinder, KeyboardBinderOptions } from "@/domain";
import { type EventListenerDisposer, type EventListener, createEventListener } from "@/events";

export class _KeyboardBinderImpl<TTarget extends EventTarget = EventTarget> implements KeyboardBinder<TTarget> {
    readonly #listener: EventListener<TTarget>;

    constructor(options?: KeyboardBinderOptions<TTarget>) {
        this.#listener = options?.listener ?? createEventListener();
    }

    bindKeyDown(
        target: TTarget,
        listener: (event: KeyboardEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer {
        return this.#listener.bind(target, "keydown", listener, options);
    }

    bindKeyUp(
        target: TTarget,
        listener: (event: KeyboardEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer {
        return this.#listener.bind(target, "keyup", listener, options);
    }
}
