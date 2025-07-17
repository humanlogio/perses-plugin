import { TraceQueryPlugin, parseVariables } from "@perses-dev/plugin-system";
import { getTraceData } from "./get-trace-data";
import { HumanlogTraceQueryEditor } from "./HumanlogTraceQueryEditor";
import { HumanlogTraceQuerySpec } from "./humanlog-trace-query-types";

export const HumanlogTraceQuery: TraceQueryPlugin<HumanlogTraceQuerySpec> = {
  getTraceData,
  OptionsEditorComponent: HumanlogTraceQueryEditor,
  createInitialOptions: () => ({ query: "" }),
  dependsOn: (spec) => {
    const queryVariables = parseVariables(spec.query);
    const allVariables = [...new Set([...queryVariables])];
    return {
      variables: allVariables,
    };
  },
};
