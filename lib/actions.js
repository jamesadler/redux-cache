"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
exports.INVALIDATE_CACHE = "@@redux-cache/INVALIDATE_CACHE";
/**
 * This action can be used to invalidate the cache for a given array of reducers.
 *
 * @param {string[]} [reducersToInvalidate=[]] List of reducers to invalidate
 * @returns {InvalidateCacheAction}
 */
exports.invalidateCache = function (reducersToInvalidate, args) {
    if (reducersToInvalidate === void 0) { reducersToInvalidate = []; }
    if (args === void 0) { args = {}; }
    var _a = args.accessStrategy, accessStrategy = _a === void 0 ? utils_1.defaultAccessStrategy : _a, _b = args.invalidateStrategy, invalidateStrategy = _b === void 0 ? utils_1.defaultInvalidateStrategy : _b;
    var reducers = typeof reducersToInvalidate === "string" ? [reducersToInvalidate] : reducersToInvalidate;
    return {
        type: exports.INVALIDATE_CACHE,
        payload: {
            reducers: reducers,
            accessStrategy: accessStrategy,
            invalidateStrategy: invalidateStrategy
        }
    };
};
//# sourceMappingURL=actions.js.map