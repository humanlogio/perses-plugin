"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HumanlogDatasourceEditor", {
    enumerable: true,
    get: function() {
        return HumanlogDatasourceEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _pluginsystem = require("@perses-dev/plugin-system");
const _react = /*#__PURE__*/ _interop_require_default(require("react"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function HumanlogDatasourceEditor(props) {
    const { value, onChange, isReadonly } = props;
    const initialSpecDirect = {
        directUrl: ""
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.HTTPSettingsEditor, {
        value: value,
        onChange: onChange,
        isReadonly: isReadonly,
        initialSpecDirect: initialSpecDirect,
        initialSpecProxy: {}
    });
}
