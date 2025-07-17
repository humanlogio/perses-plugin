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
        throw new Error("todo");
    };
    const hl2otlpStatus = (res)=>{
        throw new Error("todo");
    };
    const timestampToUnixNanoString = (ts)=>{
        throw new Error("todo");
    };
    const addDurationToDate = (ts, dur)=>{
        throw new Error("todo");
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
            events: res.events.map(hl2otlpEvent),
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
    return [];
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