import type { Readable } from "@simplix/contracts";

export const DEFAULT_TOKEN_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" as const;

export type TokenOptions<TKey> = {
    length?: number;
    charset?: string;
    map?: {
        key?: (index: number) => TKey;
    } & ({ keys?: Iterable<TKey>; size?: never } | { keys?: never; size?: number });
};

export interface Token<TKey> extends Readable<string> {
    map(): ReadonlyMap<TKey, string>;
}
