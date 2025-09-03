export const protobufToDate = (timestamp)=>{
    return new Date(Number(timestamp.seconds) * 1000 + Math.ceil(timestamp.nanos / 1000000));
};

//# sourceMappingURL=time.js.map