export interface State {
    cacheUntil?: number | null | undefined;
    [x: string]: any;
}
export declare type AccessStrategy = (state: State, reducerKey: string, cacheKey: string) => number | null | undefined;
export declare const defaultAccessStrategy: AccessStrategy;
export declare type InvalidateStrategy = (state: State, reducerKey: string, cacheKey: string) => State;
export declare const defaultInvalidateStrategy: InvalidateStrategy;
