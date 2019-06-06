"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createOriginFromNuxtOptions(options) {
    return `http${options.server.https ? 's' : ''}://${options.server.host}:${options.server.port}`;
}
exports.createOriginFromNuxtOptions = createOriginFromNuxtOptions;
