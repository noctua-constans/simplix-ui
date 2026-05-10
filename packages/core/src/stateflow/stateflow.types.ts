export type StateEventOf<T extends string = string> = { type: T };

export type StateflowSchema<S extends string, Ev extends StateEventOf, C extends object> = {
    STATE: S;
    EVENT: Ev;
    CONTEXT: C;
};
