import { type DomEventListener, type DomEventListenerDisposer, type DomEventOf } from "@/events";

export class _DomEventListenerImpl<
    TTarget extends EventTarget = EventTarget,
    TEventMap extends object = GlobalEventHandlersEventMap,
> implements DomEventListener<TTarget, TEventMap> {
    bind<TKey extends keyof TEventMap & string>(
        target: TTarget,
        type: TKey,
        listener: (event: DomEventOf<TEventMap, TKey>) => void,
        options?: AddEventListenerOptions,
    ): DomEventListenerDisposer {
        const { signal, ...rest } = options ?? {};

        if (signal?.aborted) {
            return () => {};
        }

        const handler: EventListener = (event) => {
            listener(event as DomEventOf<TEventMap, TKey>);
        };

        let disposed = false;

        const dispose: DomEventListenerDisposer = () => {
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
