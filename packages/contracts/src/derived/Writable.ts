export interface Writable<T> {
    set(next: T): boolean;
}
