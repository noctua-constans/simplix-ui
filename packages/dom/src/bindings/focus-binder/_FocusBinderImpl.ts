import type { BinderOptions, FocusBinder } from "@/bindings";
import { createEventListener, type EventListener, type EventListenerDisposer } from "@/events";

export class _FocusBinderImpl<TTarget extends EventTarget = EventTarget> implements FocusBinder<TTarget> {
    readonly #listener: EventListener<TTarget>;

    constructor(options: BinderOptions<TTarget> = {}) {
        const { listener = createEventListener() } = options;
        this.#listener = listener;
    }

    bindFocus(
        target: TTarget,
        listener: (event: FocusEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer {
        return this.#listener.add(target, "focus", listener, options);
    }

    bindBlur(
        target: TTarget,
        listener: (event: FocusEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer {
        return this.#listener.add(target, "blur", listener, options);
    }

    bindFocusIn(
        target: TTarget,
        listener: (event: FocusEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer {
        return this.#listener.add(target, "focusin", listener, options);
    }

    bindFocusOut(
        target: TTarget,
        listener: (event: FocusEvent) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer {
        return this.#listener.add(target, "focusout", listener, options);
    }
}
