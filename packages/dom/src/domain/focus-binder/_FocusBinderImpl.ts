import type { FocusBinder, BinderOptions } from "@/domain";
import { type EventListener, createEventListener, type EventListenerDisposer } from "@/events";

export class _FocusBinderImpl<TTarget extends EventTarget = EventTarget> implements FocusBinder<TTarget> {
    readonly #listener: EventListener<TTarget>;

    constructor(options?: BinderOptions<TTarget>) {
        this.#listener = options?.listener ?? createEventListener();
    }

    bindFocus(
        target: TTarget,
        listener: (event: FocusEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer {
        return this.#listener.bind(target, "focus", listener, options);
    }

    bindBlur(
        target: TTarget,
        listener: (event: FocusEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer {
        return this.#listener.bind(target, "blur", listener, options);
    }

    bindFocusIn(
        target: TTarget,
        listener: (event: FocusEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer {
        return this.#listener.bind(target, "focusin", listener, options);
    }

    bindFocusOut(
        target: TTarget,
        listener: (event: FocusEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer {
        return this.#listener.bind(target, "focusout", listener, options);
    }
}
