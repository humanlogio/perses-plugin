import { DatasourceSelector, QueryDefinition } from "@perses-dev/core";
import { HumanlogDatasourceResponse } from "../../datasources";

export interface HumanlogTimeSeriesQuerySpec {
  query: string;
  datasource?: DatasourceSelector;
}

export type DatasourceTimeSeriesQueryResponse = HumanlogDatasourceResponse;
