import { replaceVariables } from "@perses-dev/plugin-system";
import { DEFAULT_DATASOURCE } from "../constants";
import { ScalarType } from "api/js/types/v1/types_pb";
function buildTimeSeries(response) {
    if (!response?.data?.data?.shape.case || response.data.data.shape.case !== "freeForm") {
        return [];
    }
    const table = response.data.data.shape.value;
    const { type, rows } = table;
    if (!type?.columns || rows.length === 0) {
        return [];
    }
    // Find time and value columns
    const timeColumnIndex = type.columns.findIndex((col)=>col.type?.type?.case === "scalar" && col.type.type.value === ScalarType.ts);
    // Look for numeric value columns first, then duration columns
    let valueColumnIndex = type.columns.findIndex((col)=>col.type?.type?.case === "scalar" && (col.type.type.value === ScalarType.f64 || col.type.type.value === ScalarType.i64));
    // If no numeric columns found, look for duration column
    if (valueColumnIndex === -1) {
        valueColumnIndex = type.columns.findIndex((col)=>col.type?.type?.case === "scalar" && col.type.type.value === ScalarType.dur);
    }
    if (timeColumnIndex === -1 || valueColumnIndex === -1) {
        return [];
    }
    // Convert rows to time series data
    const values = [];
    for (const row of rows){
        const timeVal = row.items[timeColumnIndex];
        const valueVal = row.items[valueColumnIndex];
        if (!timeVal || !valueVal) continue;
        // Extract timestamp
        let timestamp;
        if (timeVal.kind.case === "ts") {
            timestamp = timeVal.kind.value.toDate().getTime();
        } else {
            continue; // Skip if not timestamp
        }
        // Extract value
        let value;
        if (valueVal.kind.case === "f64") {
            value = valueVal.kind.value;
        } else if (valueVal.kind.case === "i64") {
            value = Number(valueVal.kind.value);
        } else if (valueVal.kind.case === "dur") {
            // Convert duration to milliseconds
            const duration = valueVal.kind.value;
            const seconds = Number(duration.seconds || 0);
            const nanos = duration.nanos || 0;
            value = seconds * 1000 + nanos / 1000000; // Convert to milliseconds
        } else {
            value = null;
        }
        values.push([
            timestamp,
            value
        ]);
    }
    // Sort by timestamp
    values.sort((a, b)=>a[0] - b[0]);
    const result = [
        {
            name: "humanlog-time-series",
            values
        }
    ];
    return result;
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