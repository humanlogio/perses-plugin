import { jsx as _jsx } from "react/jsx-runtime";
import { HTTPSettingsEditor } from "@perses-dev/plugin-system";
import React from "react";
export function HumanlogDatasourceEditor(props) {
    const { value, onChange, isReadonly } = props;
    const initialSpecDirect = {
        directUrl: ""
    };
    return /*#__PURE__*/ _jsx(HTTPSettingsEditor, {
        value: value,
        onChange: onChange,
        isReadonly: isReadonly,
        initialSpecDirect: initialSpecDirect,
        initialSpecProxy: {}
    });
}

//# sourceMappingURL=HumanlogDatasourceEditor.js.map