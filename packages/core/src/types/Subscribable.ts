export type Listener = () => void;

export type Unsubscribe = () => void;

export interface Subscribable {
    subscribe(listener: Listener): Unsubscribe;
}
