"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const matcher_1 = require("./utils/matcher");
const createOrigin_1 = require("./utils/createOrigin");
let renderedPageCache;
function render(nuxt, options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (renderedPageCache) {
            return renderedPageCache;
        }
        const origin = createOrigin_1.createOriginFromNuxtOptions(options.nuxt.options);
        const window = (yield nuxt.renderAndGetWindow(`${origin}${options.path}`));
        const scripts = window.document.querySelectorAll('script');
        scripts.forEach(script => {
            script.remove();
        });
        const preloads = window.document.querySelectorAll('link[rel="preload"]');
        preloads.forEach(preload => {
            preload.remove();
        });
        renderedPageCache = window.document.querySelector('html').outerHTML;
        return renderedPageCache;
    });
}
function createMiddleware(options) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const { Nuxt } = require('nuxt');
        const nuxt = new Nuxt(options.nuxt.options);
        if (options.matcher && !matcher_1.matchRoute(req.url, options.matcher)) {
            next();
            return;
        }
        if (!options.matcher && options.exclude && matcher_1.matchRoute(req.url, options.exclude)) {
            next();
            return;
        }
        if (matcher_1.matchRoute(req.url, options.path || '')) {
            next();
            return;
        }
        try {
            const html = yield render(nuxt, options);
            res.writeHead(503, { 'Content-Type': 'text/html' });
            res.write(html, () => {
                res.end();
                return;
            });
        }
        catch (e) {
            console.error(e);
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.write(`<html><body>500 Internal server errror </body></html>`, () => {
                res.end();
                return;
            });
        }
    });
}
exports.createMiddleware = createMiddleware;
