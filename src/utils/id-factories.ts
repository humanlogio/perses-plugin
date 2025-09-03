import { TraceID, SpanID } from "api/js/types/v1/types_pb";

export const unit8ArrayBufferToBase16 = (buffer?: Uint8Array): string => {
  if (!buffer) return "";

  return Array.from(buffer)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

// Convert TraceID object to string
export const traceIdToString = (traceId?: TraceID): string => {
  if (!traceId || !traceId.raw) {
    return "";
  }
  return unit8ArrayBufferToBase16(traceId.raw);
};

// Convert SpanID object to string
export const spanIdToString = (spanId?: SpanID): string => {
  if (!spanId || !spanId.raw) {
    return "";
  }
  return unit8ArrayBufferToBase16(spanId.raw);
};
