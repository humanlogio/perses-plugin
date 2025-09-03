export const unit8ArrayBufferToBase16 = (buffer)=>{
    if (!buffer) return "";
    return Array.from(buffer).map((byte)=>byte.toString(16).padStart(2, "0")).join("");
};
// Convert TraceID object to string
export const traceIdToString = (traceId)=>{
    if (!traceId || !traceId.raw) {
        return "";
    }
    return unit8ArrayBufferToBase16(traceId.raw);
};
// Convert SpanID object to string
export const spanIdToString = (spanId)=>{
    if (!spanId || !spanId.raw) {
        return "";
    }
    return unit8ArrayBufferToBase16(spanId.raw);
};

//# sourceMappingURL=id-factories.js.map