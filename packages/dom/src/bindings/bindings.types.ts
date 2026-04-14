import type { EventListener } from "@/events";

export type BinderOptions<TTarget extends EventTarget = EventTarget> = {
    listener?: EventListener<TTarget>;
};