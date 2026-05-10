import {
    type DomEventOf,
    EVENT_LISTENER_NOOP,
    type EventListener,
    type EventListenerDisposer,
} from "./event-listener.types";

export class EventListenerImpl<
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
            return EVENT_LISTENER_NOOP;
        }

        const handler: globalThis.EventListener = (event: Event) => {
            listener(event as DomEventOf<TEventMap, TKey>);
        };
        let disposed = false;

        const dispose: EventListenerDisposer = () => {
            if (disposed) {
                return;
            }

            disposed = true;

            const capture = Boolean(rest.capture);

            target.removeEventListener(type, handler, capture);
            signal?.removeEventListener("abort", dispose);
        };

        target.addEventListener(type, handler, rest);
        signal?.addEventListener("abort", dispose, { once: true });

        return dispose;
    }
}
