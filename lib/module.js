"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("./middleware");
const toObject_1 = require("./utils/toObject");
const consola_1 = __importDefault(require("consola"));
let isLaunched;
function nuxtMaintenanceMode(moduleOptions) {
    if (isLaunched) {
        return;
    }
    const options = Object.assign({}, toObject_1.toObject(moduleOptions), this.options ? toObject_1.toObject(this.options.maintenance) : {});
    options.nuxt = this;
    if (!options.enabled || !options.path) {
        consola_1.default.info('Skip activation of maintenance mode plugin');
        return false;
    }
    if (options.matcher && options.exclude) {
        consola_1.default.warn('Both Matcher and Exclude were defined. Please remove one of them to avoid conflict.');
        return false;
    }
    consola_1.default.info('Add maintenance mode plugin to server middleware');
    const middleware = middleware_1.createMiddleware(options);
    this.addServerMiddleware(middleware);
    isLaunched = true;
}
exports.default = nuxtMaintenanceMode;
module.exports.meta = require('../package.json');
