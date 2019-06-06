"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function matchRoute(path, matcher) {
    if (!matcher) {
        return true;
    }
    if (matcher.constructor === Array) {
        return matcher.some((matcher) => path.match(matcher));
    }
    return path.match(matcher);
}
exports.matchRoute = matchRoute;
