import { DatasourceSelector } from "@perses-dev/core";
import { HumanlogDatasourceResponse } from "../../datasources";

export interface HumanlogTraceQuerySpec {
  query: string;
  datasource?: DatasourceSelector;
}

export type DatasourceTraceQueryResponse = HumanlogDatasourceResponse;
