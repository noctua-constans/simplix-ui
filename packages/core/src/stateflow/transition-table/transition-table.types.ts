import type { StateEventOf } from "../stateflow.types";

export type Guard<From extends string, Ev extends StateEventOf, C extends object> = (options: {
    state: From;
    event: Ev;
    context: C;
}) => boolean;

export type Reducer<From extends string, Ev extends StateEventOf, C extends object> = (options: {
    state: From;
    event: Ev;
    context: C;
}) => C;

export type Transition<S extends string, From extends S, Ev extends StateEventOf, C extends object> = {
    target?: S;
    guard?: Guard<From, Ev, C>;
    reduce?: Reducer<From, Ev, C>;
};

export type Transitions<S extends string, E extends StateEventOf, C extends object> = {
    [From in S]: Partial<{
        [Type in E["type"]]: Transition<S, From, Extract<E, { type: Type }>, C>;
    }>;
};

export type TransitionTableOptions<S extends string, E extends StateEventOf, C extends object> = [
    transitions: Transitions<S, E, C>,
];

export interface TransitionTable<S extends string, E extends StateEventOf, C extends object> {
    resolve<T extends E["type"]>(
        state: S,
        event: Extract<E, { type: T }>,
        context: C,
    ): Transition<S, S, Extract<E, { type: T }>, C> | null;
    can<T extends E["type"]>(state: S, event: Extract<E, { type: T }>, context: C): boolean;
}
