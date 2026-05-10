import type { Listener } from "./Listener";
import type { Unsubscribe } from "./Unsubscribe";

export interface Subscribable<T> {
    subscribe(listener: Listener<T>): Unsubscribe;
}
