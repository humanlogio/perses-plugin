import { HTTPSettingsEditor } from "@perses-dev/plugin-system";
import React, { ReactElement } from "react";
import { HumanlogDatasourceSpec } from "./humanlog-datasource-types";

export interface HumanlogDatasourceEditorProps {
  value: HumanlogDatasourceSpec;
  onChange: (next: HumanlogDatasourceSpec) => void;
  isReadonly?: boolean;
}

export function HumanlogDatasourceEditor(
  props: HumanlogDatasourceEditorProps,
): ReactElement {
  const { value, onChange, isReadonly } = props;

  const initialSpecDirect: HumanlogDatasourceSpec = {
    directUrl: "",
  };

  return (
    <HTTPSettingsEditor
      value={value}
      onChange={onChange}
      isReadonly={isReadonly}
      initialSpecDirect={initialSpecDirect}
      initialSpecProxy={{}}
    />
  );
}
