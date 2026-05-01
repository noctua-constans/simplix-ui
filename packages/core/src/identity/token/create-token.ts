import type { Token, TokenOptions } from "@/identity";
import { _TokenImpl } from "@/identity/token/_TokenImpl";

export function createToken<TKey = number>(options?: TokenOptions<TKey>): Token<TKey> {
    return new _TokenImpl<TKey>(options);
}
