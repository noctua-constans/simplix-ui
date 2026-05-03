export type Listener<T> = (options: T) => void;

export type Unsubscribe = () => void;

export interface Subscribable<T> {
    subscribe(listener: Listener<T>): Unsubscribe;
}
