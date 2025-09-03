import { Timestamp } from "@bufbuild/protobuf/wkt";

export const protobufToDate = (timestamp: Timestamp) => {
  return new Date(
    Number(timestamp.seconds) * 1000 + Math.ceil(timestamp.nanos / 1000000),
  );
};
