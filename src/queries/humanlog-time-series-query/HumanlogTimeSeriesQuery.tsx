import {
  TimeSeriesQueryPlugin,
  parseVariables,
} from "@perses-dev/plugin-system";
import { getTimeSeriesData } from "./get-time-series-data";
import { HumanlogTimeSeriesQueryEditor } from "./HumanlogTimeSeriesQueryEditor";
import { HumanlogTimeSeriesQuerySpec } from "./humanlog-time-series-query-types";

export const HumanlogTimeSeriesQuery: TimeSeriesQueryPlugin<HumanlogTimeSeriesQuerySpec> =
  {
    getTimeSeriesData,
    OptionsEditorComponent: HumanlogTimeSeriesQueryEditor,
    createInitialOptions: () => ({ query: "" }),
    dependsOn: (spec) => {
      const queryVariables = parseVariables(spec.query);
      const allVariables = [...new Set([...queryVariables])];
      return {
        variables: allVariables,
      };
    },
  };
