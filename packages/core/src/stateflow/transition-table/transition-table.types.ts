import type { StateEventOf } from "@/stateflow";

export type Guard<From extends string, C, Ev extends StateEventOf> = (options: {
    state: From;
    context: C;
    event: Ev;
}) => boolean;

export type Reducer<From extends string, C, Ev extends StateEventOf> = (options: {
    state: From;
    context: C;
    event: Ev;
}) => C;

export type Transition<S extends string, From extends S, C, Ev extends StateEventOf> = {
    target?: S;
    guard?: Guard<From, C, Ev>;
    reduce?: Reducer<From, C, Ev>;
};

export type Transitions<S extends string, C, E extends StateEventOf> = {
    [From in S]: Partial<{
        [Type in E["type"]]: Transition<S, From, C, Extract<E, { type: Type }>>;
    }>;
};

export type TransitionTableOptions<S extends string, C, E extends StateEventOf> = {
    transitions: Transitions<S, C, E>;
};

export interface TransitionTable<S extends string, C, E extends StateEventOf> {
    resolve<T extends E["type"]>(
        state: S,
        context: C,
        event: Extract<E, { type: T }>,
    ): Transition<S, S, C, Extract<E, { type: T }>> | null;
    can<T extends E["type"]>(state: S, context: C, event: Extract<E, { type: T }>): boolean;
}
