import {
  DatasourceSelect,
  DatasourceSelectProps,
  isVariableDatasource,
  OptionsEditorProps,
} from "@perses-dev/plugin-system";
import { ReactElement, useEffect, useState } from "react";
import { HumanlogTraceQuerySpec } from "./humanlog-trace-query-types";
import { DATASOURCE_KIND, DEFAULT_DATASOURCE } from "../constants";
import MonacoEditor from "../../components/monaco-editor";
import { Box, Typography, useTheme } from "@mui/material";

type HumanlogTraceQueryEditorProps = OptionsEditorProps<HumanlogTraceQuerySpec>;

export function HumanlogTraceQueryEditor(
  props: HumanlogTraceQueryEditorProps,
): ReactElement {
  const { onChange, value } = props;
  const { datasource } = value;
  const selectedDatasource = datasource ?? DEFAULT_DATASOURCE;
  const [localQuery, setLocalQuery] = useState(value.query);
  const theme = useTheme();

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

  useEffect(() => {
    setLocalQuery(value.query);
  }, [value.query]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Datasource Selection */}
      <Box>
        <Typography
          variant="subtitle2"
          sx={{
            mb: 1,
            fontWeight: 500,
            color: theme.palette.text.secondary,
          }}
        >
          Datasource
        </Typography>
        <DatasourceSelect
          datasourcePluginKind={DATASOURCE_KIND}
          value={selectedDatasource}
          onChange={handleDatasourceChange}
          notched
        />
      </Box>

      {/* Query Editor */}
      <Box>
        <Typography
          variant="subtitle2"
          sx={{
            mb: 1,
            fontWeight: 500,
            color: theme.palette.text.secondary,
          }}
        >
          Query
        </Typography>
        <Box
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: "4px",
            overflow: "hidden",
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[1],
            "&:hover": {
              borderColor: theme.palette.primary.main,
            },
            "&:focus-within": {
              borderColor: theme.palette.primary.main,
              borderWidth: "2px",
              margin: "-1px", // Prevent layout shift
            },
            transition: theme.transitions.create([
              "border-color",
              "box-shadow",
            ]),
          }}
        >
          <MonacoEditor
            value={localQuery}
            onChange={(val) => {
              setLocalQuery(val ?? "");
              if (val !== undefined && val !== value.query) {
                onChange({ ...value, query: val });
              }
            }}
            options={{
              fontFamily: theme.typography.fontFamily,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
