import { AccessStrategy } from "./utils";
export interface State {
    cacheUntil?: number | null | undefined;
    [x: string]: any;
}
export declare type GetState = () => State;
export declare type Args = {
    cacheKey?: string;
    accessStrategy?: AccessStrategy;
};
export declare const checkCacheValid: (getState: GetState, reducerKey: string, args?: Args) => boolean;
export default checkCacheValid;
