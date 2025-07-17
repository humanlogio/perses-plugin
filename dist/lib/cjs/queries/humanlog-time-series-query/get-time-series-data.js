"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getTimeSeriesData", {
    enumerable: true,
    get: function() {
        return getTimeSeriesData;
    }
});
const _pluginsystem = require("@perses-dev/plugin-system");
const _constants = require("../constants");
function buildTimeSeries(response) {
    if (!response) {
        return [];
    }
    return [
        {
            name: "todo",
            values: []
        }
    ];
}
const getTimeSeriesData = async (spec, context)=>{
    // return empty data if the query is empty
    if (spec.query === undefined || spec.query === null || spec.query === "") {
        return {
            series: []
        };
    }
    const query = (0, _pluginsystem.replaceVariables)(spec.query, context.variableState);
    const client = await context.datasourceStore.getDatasourceClient(// A default datasource will be selected by matching the kind of datasource if not provided
    spec.datasource ?? _constants.DEFAULT_DATASOURCE);
    const { start, end } = context.timeRange;
    const response = await client.query({
        start: start.getTime().toString(),
        end: end.getTime().toString(),
        query
    });
    const chartData = {
        series: buildTimeSeries(response),
        timeRange: {
            start,
            end
        },
        stepMs: 30 * 1000,
        metadata: {
            executedQueryString: query
        }
    };
    return chartData;
};
