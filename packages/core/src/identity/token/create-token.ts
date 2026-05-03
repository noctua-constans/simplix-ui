import { TokenImpl } from "./token.impl";
import type { Token, TokenOptions } from "./token.types";

export function createToken<TKey = number>(options?: TokenOptions<TKey>): Token<TKey> {
    return new TokenImpl<TKey>(options);
}
