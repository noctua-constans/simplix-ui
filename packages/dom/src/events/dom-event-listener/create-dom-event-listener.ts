import { _DomEventListenerImpl } from "./_DomEventListenerImpl";

import type { DomEventListener } from "@/events";

export function createDomEventListener<
    TTarget extends EventTarget = EventTarget,
    TEventMap extends object = GlobalEventHandlersEventMap,
>(): DomEventListener<TTarget, TEventMap> {
    return new _DomEventListenerImpl<TTarget, TEventMap>();
}
