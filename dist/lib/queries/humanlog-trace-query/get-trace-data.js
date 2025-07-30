import { replaceVariables } from "@perses-dev/plugin-system";
import { DEFAULT_DATASOURCE } from "../constants";
function buildTrace(response) {
    if (!response) {
        return undefined;
    }
    let spans;
    switch(response.data.data?.shape.case){
        case "spans":
            spans = response.data.data?.shape.value;
            break;
        default:
            throw new Error("query result is not tracing data: " + response.data.data?.shape.case);
    }
    const hl2otlpValue = (v)=>{
        switch(v.kind.case){
            case "str":
                return {
                    stringValue: v.kind.value
                };
            case "f64":
                return {
                    intValue: v.kind.value.toString()
                };
            case "i64":
                return {
                    intValue: v.kind.value.toString()
                };
            case "bool":
                return {
                    boolValue: v.kind.value
                };
            case "arr":
                return {
                    arrayValue: {
                        values: v.kind.value.items.map(hl2otlpValue)
                    }
                };
            default:
                throw new Error("unsupported key-value type: " + v.kind.case);
        }
    };
    const hl2otlpKeyValue = (kv)=>{
        return {
            key: kv.key,
            value: hl2otlpValue(kv.value)
        };
    };
    const hl2otlpResource = (res)=>{
        return {
            attributes: res.attributes.map(hl2otlpKeyValue)
        };
    };
    const hl2otlpScope = (res)=>{
        return {
            name: res.name
        };
    };
    const hl2otlpEvent = (res)=>{
        return {
            timeUnixNano: timestampToUnixNanoString(res.timestamp?.toDate() || new Date()),
            name: res.name || "",
            attributes: res.kvs.map(hl2otlpKeyValue)
        };
    };
    const hl2otlpStatus = (res)=>{
        if (!res) {
            return {
                code: "STATUS_CODE_UNSET",
                message: ""
            };
        }
        // Convert HumanLog status code to OTLP status code
        let statusCode;
        switch(res.code){
            case 0:
                statusCode = "STATUS_CODE_UNSET";
                break;
            case 1:
                statusCode = "STATUS_CODE_OK";
                break;
            case 2:
                statusCode = "STATUS_CODE_ERROR";
                break;
            default:
                statusCode = "STATUS_CODE_UNSET";
        }
        return {
            code: statusCode,
            message: res.message || ""
        };
    };
    const timestampToUnixNanoString = (ts)=>{
        return (ts.getTime() * 1000000).toString();
    };
    const addDurationToDate = (ts, dur)=>{
        // Extract seconds and nanoseconds from Duration
        const seconds = Number(dur.seconds || 0);
        const nanos = dur.nanos || 0;
        // Convert duration to milliseconds and add to timestamp
        const durationMs = seconds * 1000 + nanos / 1000000;
        return new Date(ts.getTime() + durationMs);
    };
    const hl2otlpSpan = (res)=>{
        const start = res.time.toDate();
        const end = addDurationToDate(start, res.duration);
        return {
            traceId: res.traceId,
            spanId: res.spanId,
            parentSpanId: res.parentSpanId,
            name: res.name,
            kind: res.kind.toString(),
            startTimeUnixNano: timestampToUnixNanoString(start),
            endTimeUnixNano: timestampToUnixNanoString(end),
            attributes: res.attributes.map(hl2otlpKeyValue),
            events: res.events?.map(hl2otlpEvent) || [],
            status: hl2otlpStatus(res.status)
        };
    };
    let resSpans = new Map();
    spans.spans.forEach((sp)=>{
        if (!sp.resource) {
            throw new Error("span doesn't have a resource");
        }
        const resID = sp.resource?.resourceHash64;
        let resSpan = resSpans.get(resID);
        if (!resSpan) {
            const res = hl2otlpResource(sp.resource);
            resSpan = {
                resource: res,
                scopeSpans: []
            };
        }
        const scope = resSpan.scopeSpans.find((sc)=>{
            sc.scope?.name == sp.scope?.name;
        });
        if (!scope) {
            resSpan.scopeSpans = [
                {
                    scope: hl2otlpScope(sp.scope),
                    spans: [
                        hl2otlpSpan(sp)
                    ]
                }
            ];
        } else {
            scope.spans.push(hl2otlpSpan(sp));
        }
        // update the value
        resSpans.set(resID, resSpan);
    });
    const out = {
        resourceSpans: Array.from(resSpans.values())
    };
    return out;
}
function buildSearchResult(response) {
    if (!response) {
        return [];
    }
    let spans;
    switch(response.data.data?.shape.case){
        case "spans":
            spans = response.data.data?.shape.value;
            break;
        default:
            return [];
    }
    // Group spans by traceId and find the earliest start time and service name for each trace
    const traceMap = new Map();
    spans.spans.forEach((span)=>{
        const traceId = span.traceId;
        const startTime = span.time?.toDate() || new Date();
        const duration = span.duration ? Number(span.duration.seconds || 0) * 1000 + (span.duration.nanos || 0) / 1000000 : 0;
        const existing = traceMap.get(traceId);
        if (!existing || startTime < existing.startTime) {
            traceMap.set(traceId, {
                traceId,
                spanCount: existing ? existing.spanCount + 1 : 1,
                serviceName: span.serviceName || "unknown",
                startTime,
                duration: existing ? Math.max(existing.duration, duration) : duration
            });
        } else {
            existing.spanCount += 1;
            existing.duration = Math.max(existing.duration, duration);
        }
    });
    return Array.from(traceMap.values()).map((trace)=>({
            traceId: trace.traceId,
            rootServiceName: trace.serviceName,
            rootTraceName: trace.serviceName,
            startTimeUnixMs: trace.startTime.getTime(),
            durationMs: trace.duration,
            spanCount: trace.spanCount,
            serviceStats: {
                [trace.serviceName]: {
                    spanCount: trace.spanCount,
                    errorCount: 0
                }
            }
        }));
}
export const getTraceData = async (spec, context)=>{
    // return empty data if the query is empty
    if (spec.query === undefined || spec.query === null || spec.query === "") {
        return {};
    }
    const query = replaceVariables(spec.query, context.variableState);
    const client = await context.datasourceStore.getDatasourceClient(// A default datasource will be selected by matching the kind of datasource if not provided
    spec.datasource ?? DEFAULT_DATASOURCE);
    const response = await client.query({
        start: "",
        end: "",
        query
    });
    const chartData = {
        trace: buildTrace(response),
        searchResult: buildSearchResult(response),
        metadata: {
            executedQueryString: query
        }
    };
    return chartData;
};

//# sourceMappingURL=get-trace-data.js.map