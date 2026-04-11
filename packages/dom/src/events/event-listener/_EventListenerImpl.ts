import { type EventListener, type EventListenerDisposer, type DomEventOf } from "@/events";

export class _EventListenerImpl<
    TTarget extends EventTarget = EventTarget,
    TEventMap extends object = GlobalEventHandlersEventMap,
> implements EventListener<TTarget, TEventMap> {
    bind<TKey extends keyof TEventMap & string>(
        target: TTarget,
        type: TKey,
        listener: (event: DomEventOf<TEventMap, TKey>) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer {
        const { signal, ...rest } = options ?? {};

        if (signal?.aborted) {
            return () => {};
        }

        const handler: globalThis.EventListener = (event) => {
            listener(event as DomEventOf<TEventMap, TKey>);
        };

        let disposed = false;

        const dispose: EventListenerDisposer = () => {
            if (disposed) {
                return;
            }

            disposed = true;
            target.removeEventListener(type, handler, rest);
            signal?.removeEventListener("abort", dispose);
        };

        target.addEventListener(type, handler, rest);
        signal?.addEventListener("abort", dispose, { once: true });

        return dispose;
    }
}
