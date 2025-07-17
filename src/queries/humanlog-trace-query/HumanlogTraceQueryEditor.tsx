import {
  DatasourceSelect,
  DatasourceSelectProps,
  isVariableDatasource,
  OptionsEditorProps,
} from "@perses-dev/plugin-system";
import { ReactElement, useEffect, useState } from "react";
import { HumanlogTraceQuerySpec } from "./humanlog-trace-query-types";
import { DATASOURCE_KIND, DEFAULT_DATASOURCE } from "../constants";

type HumanlogTraceQueryEditorProps = OptionsEditorProps<HumanlogTraceQuerySpec>;

export function HumanlogTraceQueryEditor(
  props: HumanlogTraceQueryEditorProps,
): ReactElement {
  const { onChange, value } = props;
  const { datasource } = value;
  const selectedDatasource = datasource ?? DEFAULT_DATASOURCE;
  const [localQuery, setLocalQuery] = useState(value.query);

  const handleDatasourceChange: DatasourceSelectProps["onChange"] = (
    newDatasourceSelection,
  ) => {
    if (
      !isVariableDatasource(newDatasourceSelection) &&
      newDatasourceSelection.kind === DATASOURCE_KIND
    ) {
      onChange({ ...value, datasource: newDatasourceSelection });
      return;
    }

    throw new Error(
      "Got unexpected non HumanlogTraceQuery datasource selection",
    );
  };

  const handleQueryBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    if (newQuery !== value.query) {
      onChange({ ...value, query: newQuery });
    }
  };

  useEffect(() => {
    setLocalQuery(value.query);
  }, [value.query]);

  return (
    <div>
      <label>HumanlogTraceQuery Datasource</label>
      <DatasourceSelect
        datasourcePluginKind={DATASOURCE_KIND}
        value={selectedDatasource}
        onChange={handleDatasourceChange}
        label="HumanlogTraceQuery Datasource"
        notched
      />
      <input
        onBlur={handleQueryBlur}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder="query"
        value={localQuery}
      />
    </div>
  );
}
