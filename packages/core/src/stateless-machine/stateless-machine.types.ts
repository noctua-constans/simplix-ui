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

export type StatelessMachineOptions<S extends string, E extends StateEventOf> = {
    transitions: Transitions<S, E>;
};

export interface StatelessMachine<S extends string, E extends StateEventOf> {
    resolve<T extends E["type"]>(state: S, event: Extract<E, { type: T }>): S | null;
    can<T extends E["type"]>(state: S, event: Extract<E, { type: T }>): boolean;
}
