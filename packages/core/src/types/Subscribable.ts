export interface Subscribable {
    subscribe(listener: () => void): () => void;
}
