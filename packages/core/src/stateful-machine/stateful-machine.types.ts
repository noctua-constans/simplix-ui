import type { Readable, Subscribable } from "../types";

export type StateEventOf<T extends string = string> = { type: T };

export type Guard<From extends string, Ev extends StateEventOf> = (options: { state: From; event: Ev }) => boolean;

export type Transition<S extends string, From extends S, Ev extends StateEventOf> = {
    target: S;
    guard?: Guard<From, Ev>;
};

export type Transitions<S extends string, E extends StateEventOf> = {
    [From in S]: Partial<{
        [Type in E["type"]]: Transition<S, From, Extract<E, { type: Type }>>;
    }>;
};

export type TransitionTableOptions<S extends string, E extends StateEventOf> = {
    transitions: Transitions<S, E>;
};

export type StatefulMachineOptions<S extends string, E extends StateEventOf> = {
    initialState: S;
    table: TransitionTable<S, E>;
};

export interface TransitionTable<S extends string, E extends StateEventOf> {
    resolve<T extends E["type"]>(state: S, event: Extract<E, { type: T }>): S | null;
    can<T extends E["type"]>(state: S, event: Extract<E, { type: T }>): boolean;
}

export interface StatefulMachine<S extends string, E extends StateEventOf> extends Readable<S>, Subscribable {
    send<T extends E["type"]>(event: Extract<E, { type: T }>): void;
    can<T extends E["type"]>(event: Extract<E, { type: T }>): boolean;
}
