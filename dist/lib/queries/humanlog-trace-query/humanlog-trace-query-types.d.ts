import { DatasourceSelector } from "@perses-dev/core";
import { HumanlogDatasourceResponse } from "../../datasources";
export interface HumanlogTraceQuerySpec {
    query: string;
    datasource?: DatasourceSelector;
}
export type DatasourceTraceQueryResponse = HumanlogDatasourceResponse;
//# sourceMappingURL=humanlog-trace-query-types.d.ts.map