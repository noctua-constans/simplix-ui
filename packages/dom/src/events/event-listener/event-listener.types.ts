export type DomEventOf<TEventMap extends object, TKey extends keyof TEventMap> = TEventMap[TKey] & Event;

export type EventListenerDisposer = () => void;

export interface EventListener<
    TTarget extends EventTarget = EventTarget,
    TEventMap extends object = GlobalEventHandlersEventMap,
> {
    add<TKey extends keyof TEventMap & string>(
        target: TTarget,
        type: TKey,
        listener: (event: DomEventOf<TEventMap, TKey>) => void,
        options?: AddEventListenerOptions,
    ): EventListenerDisposer;
}
