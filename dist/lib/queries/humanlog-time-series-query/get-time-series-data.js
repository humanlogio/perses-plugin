import { replaceVariables } from "@perses-dev/plugin-system";
import { DEFAULT_DATASOURCE } from "../constants";
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
export const getTimeSeriesData = async (spec, context)=>{
    // return empty data if the query is empty
    if (spec.query === undefined || spec.query === null || spec.query === "") {
        return {
            series: []
        };
    }
    const query = replaceVariables(spec.query, context.variableState);
    const client = await context.datasourceStore.getDatasourceClient(// A default datasource will be selected by matching the kind of datasource if not provided
    spec.datasource ?? DEFAULT_DATASOURCE);
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

//# sourceMappingURL=get-time-series-data.js.map