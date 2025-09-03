"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get spanIdToString () {
        return spanIdToString;
    },
    get traceIdToString () {
        return traceIdToString;
    },
    get unit8ArrayBufferToBase16 () {
        return unit8ArrayBufferToBase16;
    }
});
const unit8ArrayBufferToBase16 = (buffer)=>{
    if (!buffer) return "";
    return Array.from(buffer).map((byte)=>byte.toString(16).padStart(2, "0")).join("");
};
const traceIdToString = (traceId)=>{
    if (!traceId || !traceId.raw) {
        return "";
    }
    return unit8ArrayBufferToBase16(traceId.raw);
};
const spanIdToString = (spanId)=>{
    if (!spanId || !spanId.raw) {
        return "";
    }
    return unit8ArrayBufferToBase16(spanId.raw);
};
