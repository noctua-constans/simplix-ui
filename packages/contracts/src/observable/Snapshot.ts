export type Snapshot<TDataMap extends object> = {
    readonly [K in keyof TDataMap]: TDataMap[K];
};
