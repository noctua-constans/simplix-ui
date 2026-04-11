export type DomEventListenerDisposer = () => void;

export type DomEventOf<TEventMap extends object, TKey extends keyof TEventMap> = TEventMap[TKey] & Event;

export interface DomEventListener<
    TTarget extends EventTarget = EventTarget,
    TEventMap extends object = GlobalEventHandlersEventMap,
> {
    bind<TKey extends keyof TEventMap & string>(
        target: TTarget,
        type: TKey,
        listener: (event: DomEventOf<TEventMap, TKey>) => void,
        options?: AddEventListenerOptions,
    ): DomEventListenerDisposer;
}
