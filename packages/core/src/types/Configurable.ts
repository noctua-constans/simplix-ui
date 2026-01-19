export interface Configurable<T> {
    configure(next: T): void;
}
