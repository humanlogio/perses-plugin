import { DatasourceSelector } from "@perses-dev/core";
import { HumanlogDatasourceResponse } from "../../datasources";

export interface HumanlogTimeSeriesQuerySpec {
  query: string;
  datasource?: DatasourceSelector;
}

export type DatasourceQueryResponse = HumanlogDatasourceResponse;
