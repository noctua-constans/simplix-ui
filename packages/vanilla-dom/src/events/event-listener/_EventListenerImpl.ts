import { type DomEventOf, type EventListener, type EventListenerDisposer } from "@/events";

export class _EventListenerImpl<
    TTarget extends EventTarget = EventTarget,
    TEventMap extends object = GlobalEventHandlersEventMap,
> implements EventListener<TTarget, TEventMap> {
    add<TKey extends keyof TEventMap & string>(
        target: TTarget,
        type: TKey,
        listener: (event: DomEventOf<TEventMap, TKey>) => void,
        options: AddEventListenerOptions = {},
    ): EventListenerDisposer {
        const { signal, ...rest } = options;

        if (signal?.aborted) {
            return () => {};
        }

        const handler = this.#createHandler(listener);
        const dispose = this.#createDisposer(target, type, handler, rest, signal);

        target.addEventListener(type, handler, rest);
        signal?.addEventListener("abort", dispose, { once: true });

        return dispose;
    }

    #createHandler<TKey extends keyof TEventMap & string>(
        listener: (event: DomEventOf<TEventMap, TKey>) => void,
    ): globalThis.EventListener {
        return (event: Event) => {
            listener(event as DomEventOf<TEventMap, TKey>);
        };
    }

    #createDisposer<TKey extends keyof TEventMap & string>(
        target: TTarget,
        type: TKey,
        handler: globalThis.EventListener,
        options: AddEventListenerOptions,
        signal: AbortSignal | undefined,
    ): EventListenerDisposer {
        let disposed = false;

        const dispose: EventListenerDisposer = () => {
            if (disposed) {
                return;
            }

            disposed = true;
            target.removeEventListener(type, handler, options);
            signal?.removeEventListener("abort", dispose);
        };

        return dispose;
    }
}
