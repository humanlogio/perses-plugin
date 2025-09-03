import { DurationString, TraceData, TraceSearchResult } from "@perses-dev/core";
import { TraceQueryPlugin, replaceVariables } from "@perses-dev/plugin-system";
import {
  HumanlogTraceQuerySpec,
  DatasourceTraceQueryResponse,
} from "./humanlog-trace-query-types";
import { DEFAULT_DATASOURCE } from "../constants";
import { HumanlogDatasourceClient } from "../../datasources";
import {
  Event,
  ResourceSpan,
  Span,
  Status,
  TracesData,
} from "@perses-dev/core/dist/model/otlp/trace/v1/trace";
import { Spans } from "api/js/types/v1/data_pb";
import { Resource as HLResource } from "api/js/types/v1/otel_resource_pb";
import { Scope as HLScope } from "api/js/types/v1/otel_scope_pb";
import {
  Span as HLSpan,
  Span_Event as HLEvent,
  Span_Status as HLStatus,
} from "api/js/types/v1/otel_tracing_pb";
import { Resource } from "@perses-dev/core/dist/model/otlp/resource/v1/resource";
import { KV, Val } from "api/js/types/v1/types_pb";
import {
  AnyValue,
  InstrumentationScope,
  KeyValue,
} from "@perses-dev/core/dist/model/otlp/common/v1/common";
import { Duration } from "@bufbuild/protobuf/wkt";
import { protobufToDate } from "../../utils/time";
import { spanIdToString, traceIdToString } from "../../utils/id-factories";

function buildTrace(
  response?: DatasourceTraceQueryResponse,
): TracesData | undefined {
  if (!response) {
    return undefined;
  }

  let spans: Spans;
  switch (response.data.data?.shape.case) {
    case "spans":
      spans = response.data.data?.shape.value;
      break;
    default:
      throw new Error(
        "query result is not tracing data: " + response.data.data?.shape.case,
      );
  }

  const hl2otlpValue = (v: Val): AnyValue => {
    switch (v.kind.case) {
      case "str":
        return { stringValue: v.kind.value };
      case "f64":
        return { intValue: v.kind.value.toString() };
      case "i64":
        return { intValue: v.kind.value.toString() };
      case "bool":
        return { boolValue: v.kind.value };
      case "arr":
        return { arrayValue: { values: v.kind.value.items.map(hl2otlpValue) } };
      default:
        throw new Error("unsupported key-value type: " + v.kind.case);
    }
  };

  const hl2otlpKeyValue = (kv: KV): KeyValue => {
    return { key: kv.key, value: hl2otlpValue(kv.value!) };
  };

  const hl2otlpResource = (res: HLResource): Resource => {
    return { attributes: res.attributes.map(hl2otlpKeyValue) };
  };
  const hl2otlpScope = (res: HLScope): InstrumentationScope => {
    return { name: res.name };
  };
  const hl2otlpEvent = (res: HLEvent): Event => {
    return {
      timeUnixNano: timestampToUnixNanoString(
        protobufToDate(res.timestamp!) || new Date(),
      ),
      name: res.name || "",
      attributes: res.kvs.map(hl2otlpKeyValue),
    };
  };
  const hl2otlpStatus = (res: HLStatus | undefined): Status => {
    if (!res) {
      return {
        code: "STATUS_CODE_UNSET" as const,
        message: "",
      };
    }

    // Convert HumanLog status code to OTLP status code
    let statusCode:
      | "STATUS_CODE_UNSET"
      | "STATUS_CODE_OK"
      | "STATUS_CODE_ERROR";
    switch (res.code) {
      case 0: // UNSET
        statusCode = "STATUS_CODE_UNSET";
        break;
      case 1: // OK
        statusCode = "STATUS_CODE_OK";
        break;
      case 2: // ERROR
        statusCode = "STATUS_CODE_ERROR";
        break;
      default:
        statusCode = "STATUS_CODE_UNSET";
    }

    return {
      code: statusCode,
      message: res.message || "",
    };
  };
  const timestampToUnixNanoString = (ts: Date): string => {
    return (ts.getTime() * 1000000).toString();
  };

  const addDurationToDate = (ts: Date, dur: Duration): Date => {
    // Extract seconds and nanoseconds from Duration
    const seconds = Number(dur.seconds || 0);
    const nanos = dur.nanos || 0;

    // Convert duration to milliseconds and add to timestamp
    const durationMs = seconds * 1000 + nanos / 1000000;

    return new Date(ts.getTime() + durationMs);
  };

  const hl2otlpSpan = (res: HLSpan): Span => {
    res.time?.nanos;
    const start = protobufToDate(res.time!);
    const end = addDurationToDate(start, res.duration!);
    const traceId = traceIdToString(res.traceId);
    const spanId = spanIdToString(res.spanId);
    const parentSpanId = spanIdToString(res.parentSpanId);
    return {
      traceId,
      spanId,
      parentSpanId,
      name: res.name,
      kind: res.kind.toString(),
      startTimeUnixNano: timestampToUnixNanoString(start),
      endTimeUnixNano: timestampToUnixNanoString(end),
      attributes: res.attributes.map(hl2otlpKeyValue),
      events: res.events?.map(hl2otlpEvent) || [],
      status: hl2otlpStatus(res.status),
    };
  };

  let resSpans = new Map<bigint, ResourceSpan>();

  spans.spans.forEach((sp) => {
    if (!sp.resource) {
      throw new Error("span doesn't have a resource");
    }
    const resID = sp.resource?.resourceHash64;
    let resSpan = resSpans.get(resID);
    if (!resSpan) {
      const res = hl2otlpResource(sp.resource!);
      resSpan = {
        resource: res,
        scopeSpans: [],
      };
    }
    const scope = resSpan.scopeSpans.find((sc) => {
      sc.scope?.name == sp.scope?.name;
    });
    if (!scope) {
      resSpan.scopeSpans = [
        {
          scope: hl2otlpScope(sp.scope!),
          spans: [hl2otlpSpan(sp)],
        },
      ];
    } else {
      scope.spans.push(hl2otlpSpan(sp));
    }
    // update the value
    resSpans.set(resID, resSpan);
  });

  const out: TracesData = {
    resourceSpans: Array.from(resSpans.values()),
  };
  return out;
}

function buildSearchResult(
  response?: DatasourceTraceQueryResponse,
): TraceSearchResult[] {
  if (!response) {
    return [];
  }

  let spans: Spans;
  switch (response.data.data?.shape.case) {
    case "spans":
      spans = response.data.data?.shape.value;
      break;
    default:
      return [];
  }

  // Group spans by traceId and find the earliest start time and service name for each trace
  const traceMap = new Map<
    string,
    {
      traceId: string;
      spanCount: number;
      serviceName: string;
      startTime: Date;
      duration: number;
    }
  >();

  spans.spans.forEach((span) => {
    const traceId = traceIdToString(span.traceId);
    const startTime = protobufToDate(span.time!) || new Date();
    const duration = span.duration
      ? Number(span.duration.seconds || 0) * 1000 +
        (span.duration.nanos || 0) / 1000000
      : 0;

    const existing = traceMap.get(traceId);
    if (!existing || startTime < existing.startTime) {
      traceMap.set(traceId, {
        traceId,
        spanCount: existing ? existing.spanCount + 1 : 1,
        serviceName: span.serviceName || "unknown",
        startTime,
        duration: existing ? Math.max(existing.duration, duration) : duration,
      });
    } else {
      existing.spanCount += 1;
      existing.duration = Math.max(existing.duration, duration);
    }
  });

  return Array.from(traceMap.values()).map((trace) => ({
    traceId: trace.traceId,
    rootServiceName: trace.serviceName,
    rootTraceName: trace.serviceName, // Use service name as trace name if no specific root span name
    startTimeUnixMs: trace.startTime.getTime(),
    durationMs: trace.duration,
    spanCount: trace.spanCount,
    serviceStats: {
      [trace.serviceName]: {
        spanCount: trace.spanCount,
        errorCount: 0, // TODO: Count error spans if needed
      },
    },
  }));
}

export const getTraceData: TraceQueryPlugin<HumanlogTraceQuerySpec>["getTraceData"] =
  async (spec, context) => {
    // return empty data if the query is empty
    if (spec.query === undefined || spec.query === null || spec.query === "") {
      return {};
    }

    const query = replaceVariables(spec.query, context.variableState);

    const client = (await context.datasourceStore.getDatasourceClient(
      // A default datasource will be selected by matching the kind of datasource if not provided
      spec.datasource ?? DEFAULT_DATASOURCE,
    )) as HumanlogDatasourceClient;

    const response = await client.query({
      start: "",
      end: "",
      query,
    });

    const chartData: TraceData = {
      trace: buildTrace(response),
      searchResult: buildSearchResult(response),
      metadata: {
        executedQueryString: query,
      },
    };

    return chartData;
  };
