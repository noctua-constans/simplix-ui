import { DEFAULT_TOKEN_CHARSET, type Token, type TokenOptions } from "./token.types";

export class TokenImpl<TKey> implements Token<TKey> {
    readonly #length: number;
    readonly #charset: string;

    readonly #mapKey: (index: number) => TKey;
    readonly #mapKeys: Iterable<TKey> | undefined;
    readonly #mapSize: number;

    #token: string | null;
    #map: Map<TKey, string> | null;

    constructor(options: TokenOptions<TKey> = {}) {
        const { length = 12, charset = DEFAULT_TOKEN_CHARSET, map = {} } = options;
        const { key = (index: number) => index as TKey, keys, size = 16 } = map;

        this.#length = length;
        this.#charset = charset;

        this.#mapKey = key;
        this.#mapKeys = keys;
        this.#mapSize = size;

        this.#token = null;
        this.#map = null;
    }

    get(): string {
        if (this.#token === null) {
            this.#token = this.#generate();
        }

        return this.#token;
    }

    map(): ReadonlyMap<TKey, string> {
        if (this.#map) {
            return this.#map;
        }

        const result = new Map<TKey, string>();

        if (this.#mapKeys !== undefined) {
            for (const key of this.#mapKeys) {
                result.set(key, `${this.#generate()}`);
            }
        } else {
            for (let i = 0; i < this.#mapSize; i++) {
                result.set(this.#mapKey(i), `${this.#generate()}`);
            }
        }

        this.#map = result;
        return result;
    }

    #generate(): string {
        let result = "";

        for (let i = 0; i < this.#length; i++) {
            result += this.#charset[Math.floor(Math.random() * this.#charset.length)];
        }

        return result;
    }
}
