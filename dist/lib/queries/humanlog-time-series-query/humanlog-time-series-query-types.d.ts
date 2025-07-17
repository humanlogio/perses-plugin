import { DatasourceSelector } from "@perses-dev/core";
import { HumanlogDatasourceResponse } from "../../datasources";
export interface HumanlogTimeSeriesQuerySpec {
    query: string;
    datasource?: DatasourceSelector;
}
export type DatasourceTimeSeriesQueryResponse = HumanlogDatasourceResponse;
//# sourceMappingURL=humanlog-time-series-query-types.d.ts.map