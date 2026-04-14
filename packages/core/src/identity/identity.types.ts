export interface Cursor<T> {
    next(): T;
    peek(): T;
    hasNext(): boolean;
}
