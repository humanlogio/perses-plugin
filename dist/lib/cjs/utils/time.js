"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "protobufToDate", {
    enumerable: true,
    get: function() {
        return protobufToDate;
    }
});
const protobufToDate = (timestamp)=>{
    return new Date(Number(timestamp.seconds) * 1000 + Math.ceil(timestamp.nanos / 1000000));
};
