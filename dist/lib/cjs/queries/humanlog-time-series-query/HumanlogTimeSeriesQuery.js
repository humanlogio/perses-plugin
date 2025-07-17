"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HumanlogTimeSeriesQuery", {
    enumerable: true,
    get: function() {
        return HumanlogTimeSeriesQuery;
    }
});
const _pluginsystem = require("@perses-dev/plugin-system");
const _gettimeseriesdata = require("./get-time-series-data");
const _HumanlogTimeSeriesQueryEditor = require("./HumanlogTimeSeriesQueryEditor");
const HumanlogTimeSeriesQuery = {
    getTimeSeriesData: _gettimeseriesdata.getTimeSeriesData,
    OptionsEditorComponent: _HumanlogTimeSeriesQueryEditor.HumanlogTimeSeriesQueryEditor,
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
