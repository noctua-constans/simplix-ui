export interface Syncable<T> {
    sync(next: T): boolean;
}
