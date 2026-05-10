import { EventListenerImpl } from "./event-listener.impl";

import type { EventListener } from "@/events";

export function createEventListener<
    TTarget extends EventTarget = EventTarget,
    TEventMap extends object = GlobalEventHandlersEventMap,
>(): EventListener<TTarget, TEventMap> {
    return new EventListenerImpl<TTarget, TEventMap>();
}
