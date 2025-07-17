"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HumanlogTraceQuery", {
    enumerable: true,
    get: function() {
        return HumanlogTraceQuery;
    }
});
const _pluginsystem = require("@perses-dev/plugin-system");
const _gettracedata = require("./get-trace-data");
const _HumanlogTraceQueryEditor = require("./HumanlogTraceQueryEditor");
const HumanlogTraceQuery = {
    getTraceData: _gettracedata.getTraceData,
    OptionsEditorComponent: _HumanlogTraceQueryEditor.HumanlogTraceQueryEditor,
    createInitialOptions: ()=>({
            query: ""
        }),
    dependsOn: (spec)=>{
        const queryVariables = (0, _pluginsystem.parseVariables)(spec.query);
        const allVariables = [
            ...new Set([
                ...queryVariables
            ])
        ];
        return {
            variables: allVariables
        };
    }
};
