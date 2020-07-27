"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var actions_1 = require("./actions");
var logResult = function (name, array) {
    console.log("redux-cache: %s: %s", name, array.join(", ") || "none found");
};
var logGeneral = function (message) {
    var data = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        data[_i - 1] = arguments[_i];
    }
    console.log.apply(console, ["redux-cache: " + message].concat(data));
};
/**
 * This fn will handle invalidating the reducers you specify. It returns the updated state with the cache
 * values set to null.
 *
 * @param reducersToInvalidate List of reducers to invalidate
 * @param currentState The current and already reduced state.
 * @param [config={}] Configuration options
 * @param [config.log=false] Whether or not to output log information. Useful for debugging.
 * @param [config.cacheKey=DEFAULT_KEY] The cache key to use instead of the DEFAULT_KEY
 */
exports.buildUpdateState = function (logResultFn, logGeneralFn) { return function (args) {
    var reducersToInvalidate = args.reducersToInvalidate, accessStrategy = args.accessStrategy, invalidateStrategy = args.invalidateStrategy, currentState = args.currentState, config = args.config;
    var _a = config.log, log = _a === void 0 ? false : _a, _b = config.cacheKey, cacheKey = _b === void 0 ? constants_1.DEFAULT_KEY : _b;
    var newState = __assign({}, currentState);
    var stateKeys = Object.keys(newState);
    // We filter to those reducers which exist in the application state tree
    var matchedReducers = reducersToInvalidate.filter(function (reducerKey) {
        var matched = (stateKeys.indexOf(reducerKey) !== -1);
        if (!matched && log) {
            logGeneralFn("Did not match %s reducer to the state tree", reducerKey);
        }
        return matched;
    });
    if (log) {
        logResultFn("matchedReducers", matchedReducers);
    }
    // We filter those existing reducers down to those which actually have a the cache key.
    var cacheEnabledReducers = matchedReducers.filter(function (reducerKey) {
        return accessStrategy(newState, reducerKey, cacheKey);
    });
    if (log) {
        logResultFn("cacheEnabledReducers", cacheEnabledReducers);
    }
    // We are invalidating the cached reducers by setting the value for the cache key to null.
    // Don't fret -- they'll get a new and improved value for the cache key again when the successful action comes through.
    var updatedState = cacheEnabledReducers.reduce(function (prev, reducerKey) {
        return __assign({}, prev, invalidateStrategy(newState, reducerKey, cacheKey));
    }, newState);
    if (log) {
        if (cacheEnabledReducers.length > 0) {
            logGeneralFn("Set %s to null for following reducers: %s", cacheKey, cacheEnabledReducers.join(", "));
        }
        else {
            logGeneralFn("No cached reducers to update");
        }
    }
    return updatedState;
}; };
exports.updateState = exports.buildUpdateState(logResult, logGeneral);
exports.liftReducer = function (reducer, config) { return function (state, action) {
    var currentState = reducer(state, action);
    if (action.type !== actions_1.INVALIDATE_CACHE) {
        return currentState;
    }
    var reducersToInvalidate = action.payload && action.payload.reducers || [];
    var accessStrategy = action.payload && action.payload.accessStrategy;
    var invalidateStrategy = action.payload && action.payload.invalidateStrategy;
    var newState = exports.updateState({
        reducersToInvalidate: reducersToInvalidate,
        accessStrategy: accessStrategy,
        invalidateStrategy: invalidateStrategy,
        currentState: currentState,
        config: config
    });
    return newState;
}; };
/**
 * This is the store enhancer that you will add when you configureStore.
 */
exports.buildCacheEnhancer = function (liftReducerFn) { return function (config) {
    if (config === void 0) { config = {}; }
    return function (createStore) { return function (rootReducer, initialState, enhancer) {
        var store = createStore(liftReducerFn(rootReducer, config), initialState, enhancer);
        return __assign({}, store, { replaceReducer: function (reducer) {
                return store.replaceReducer(liftReducerFn(reducer, config));
            } });
    }; };
}; };
exports.cacheEnhancer = exports.buildCacheEnhancer(exports.liftReducer);
//# sourceMappingURL=cacheEnhancer.js.map