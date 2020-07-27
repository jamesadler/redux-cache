import { AccessStrategy, InvalidateStrategy } from "./utils";
export declare const INVALIDATE_CACHE = "@@redux-cache/INVALIDATE_CACHE";
export interface InvalidateCacheAction {
    type: string;
    payload: {
        reducers: string[];
        accessStrategy: AccessStrategy;
        invalidateStrategy: InvalidateStrategy;
    };
}
export interface InvalidateCacheArgs {
    accessStrategy?: AccessStrategy;
    invalidateStrategy?: InvalidateStrategy;
}
/**
 * This action can be used to invalidate the cache for a given array of reducers.
 *
 * @param {string[]} [reducersToInvalidate=[]] List of reducers to invalidate
 * @returns {InvalidateCacheAction}
 */
export declare const invalidateCache: (reducersToInvalidate?: string | string[], args?: InvalidateCacheArgs) => InvalidateCacheAction;
