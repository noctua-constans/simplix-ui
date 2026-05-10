export interface Resetable<T> {
    reset(from?: T): boolean;
}
