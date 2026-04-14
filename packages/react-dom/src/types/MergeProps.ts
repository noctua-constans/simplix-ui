export type MergeProps<T, E> = T & Omit<E, keyof T>;
