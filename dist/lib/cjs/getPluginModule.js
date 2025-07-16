"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getPluginModule", {
    enumerable: true,
    get: function() {
        return getPluginModule;
    }
});
const _packagejson = /*#__PURE__*/ _interop_require_default(require("../package.json"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function getPluginModule() {
    const { name, version, perses } = _packagejson.default;
    return {
        kind: 'PluginModule',
        metadata: {
            name,
            version
        },
        spec: perses
    };
}
