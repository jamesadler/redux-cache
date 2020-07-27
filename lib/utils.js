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
exports.defaultAccessStrategy = function (state, reducerKey, cacheKey) {
    return state && state[reducerKey] && state[reducerKey][cacheKey];
};
exports.defaultInvalidateStrategy = function (state, reducerKey, cacheKey) {
    var _a, _b;
    return _a = {},
        _a[reducerKey] = __assign({}, state[reducerKey], (_b = {}, _b[cacheKey] = null, _b)),
        _a;
};
//# sourceMappingURL=utils.js.map