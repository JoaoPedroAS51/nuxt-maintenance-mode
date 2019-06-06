"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function matchRoute(path, matcher) {
    if (!matcher) {
        return true;
    }
    return path.match(matcher);
}
exports.matchRoute = matchRoute;
