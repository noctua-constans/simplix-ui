import { _EventListenerImpl } from "./_EventListenerImpl";

import type { EventListener } from "@/events";

export function createEventListener<
    TTarget extends EventTarget = EventTarget,
    TEventMap extends object = GlobalEventHandlersEventMap,
>(): EventListener<TTarget, TEventMap> {
    return new _EventListenerImpl<TTarget, TEventMap>();
}
