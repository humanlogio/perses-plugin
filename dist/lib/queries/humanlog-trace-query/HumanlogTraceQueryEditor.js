import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DatasourceSelect, isVariableDatasource } from "@perses-dev/plugin-system";
import { useEffect, useState } from "react";
import { DATASOURCE_KIND, DEFAULT_DATASOURCE } from "../constants";
import MonacoEditor from "../../components/monaco-editor";
import { Box, Typography, useTheme } from "@mui/material";
export function HumanlogTraceQueryEditor(props) {
    const { onChange, value } = props;
    const { datasource } = value;
    const selectedDatasource = datasource ?? DEFAULT_DATASOURCE;
    const [localQuery, setLocalQuery] = useState(value.query);
    const theme = useTheme();
    const handleDatasourceChange = (newDatasourceSelection)=>{
        if (!isVariableDatasource(newDatasourceSelection) && newDatasourceSelection.kind === DATASOURCE_KIND) {
            onChange({
                ...value,
                datasource: newDatasourceSelection
            });
            return;
        }
        throw new Error("Got unexpected non HumanlogTraceQuery datasource selection");
    };
    useEffect(()=>{
        setLocalQuery(value.query);
    }, [
        value.query
    ]);
    return /*#__PURE__*/ _jsxs(Box, {
        sx: {
            display: "flex",
            flexDirection: "column",
            gap: 2
        },
        children: [
            /*#__PURE__*/ _jsxs(Box, {
                children: [
                    /*#__PURE__*/ _jsx(Typography, {
                        variant: "subtitle2",
                        sx: {
                            mb: 1,
                            fontWeight: 500,
                            color: theme.palette.text.secondary
                        },
                        children: "Datasource"
                    }),
                    /*#__PURE__*/ _jsx(DatasourceSelect, {
                        datasourcePluginKind: DATASOURCE_KIND,
                        value: selectedDatasource,
                        onChange: handleDatasourceChange,
                        notched: true
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs(Box, {
                children: [
                    /*#__PURE__*/ _jsx(Typography, {
                        variant: "subtitle2",
                        sx: {
                            mb: 1,
                            fontWeight: 500,
                            color: theme.palette.text.secondary
                        },
                        children: "Query"
                    }),
                    /*#__PURE__*/ _jsx(Box, {
                        sx: {
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: "4px",
                            overflow: "hidden",
                            backgroundColor: theme.palette.background.paper,
                            boxShadow: theme.shadows[1],
                            "&:hover": {
                                borderColor: theme.palette.primary.main
                            },
                            "&:focus-within": {
                                borderColor: theme.palette.primary.main,
                                borderWidth: "2px",
                                margin: "-1px"
                            },
                            transition: theme.transitions.create([
                                "border-color",
                                "box-shadow"
                            ])
                        },
                        children: /*#__PURE__*/ _jsx(MonacoEditor, {
                            value: localQuery,
                            onChange: (val)=>{
                                setLocalQuery(val ?? "");
                                if (val !== undefined && val !== value.query) {
                                    onChange({
                                        ...value,
                                        query: val
                                    });
                                }
                            },
                            options: {
                                fontFamily: theme.typography.fontFamily
                            }
                        })
                    })
                ]
            })
        ]
    });
}

//# sourceMappingURL=HumanlogTraceQueryEditor.js.map