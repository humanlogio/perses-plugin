import { RequestHeaders } from "@perses-dev/core";
import { DatasourceClient } from "@perses-dev/plugin-system";
import { QueryResponse } from "api/js/svc/query/v1/service_pb";
export interface HumanlogDatasourceSpec {
    directUrl?: string;
}
interface QueryRequestParameters extends Record<string, string> {
    query: string;
    start: string;
    end: string;
}
interface HumanlogDatasourceClientOptions {
    datasourceUrl: string;
    headers?: RequestHeaders;
}
export interface HumanlogDatasourceResponse {
    status: string;
    warnings?: string[];
    data: QueryResponse;
}
export interface HumanlogDatasourceClient extends DatasourceClient {
    options: HumanlogDatasourceClientOptions;
    query(params: QueryRequestParameters, headers?: RequestHeaders): Promise<HumanlogDatasourceResponse>;
}
export {};
//# sourceMappingURL=humanlog-datasource-types.d.ts.map