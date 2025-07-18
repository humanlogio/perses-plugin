"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HumanlogTraceQueryEditor", {
    enumerable: true,
    get: function() {
        return HumanlogTraceQueryEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _pluginsystem = require("@perses-dev/plugin-system");
const _react = require("react");
const _constants = require("../constants");
const _monacoeditor = /*#__PURE__*/ _interop_require_default(require("../../components/monaco-editor"));
const _material = require("@mui/material");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function HumanlogTraceQueryEditor(props) {
    const { onChange, value } = props;
    const { datasource } = value;
    const selectedDatasource = datasource ?? _constants.DEFAULT_DATASOURCE;
    const [localQuery, setLocalQuery] = (0, _react.useState)(value.query);
    const theme = (0, _material.useTheme)();
    const handleDatasourceChange = (newDatasourceSelection)=>{
        if (!(0, _pluginsystem.isVariableDatasource)(newDatasourceSelection) && newDatasourceSelection.kind === _constants.DATASOURCE_KIND) {
            onChange({
                ...value,
                datasource: newDatasourceSelection
            });
            return;
        }
        throw new Error("Got unexpected non HumanlogTraceQuery datasource selection");
    };
    (0, _react.useEffect)(()=>{
        setLocalQuery(value.query);
    }, [
        value.query
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
        sx: {
            display: "flex",
            flexDirection: "column",
            gap: 2
        },
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                        variant: "subtitle2",
                        sx: {
                            mb: 1,
                            fontWeight: 500,
                            color: theme.palette.text.secondary
                        },
                        children: "Datasource"
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.DatasourceSelect, {
                        datasourcePluginKind: _constants.DATASOURCE_KIND,
                        value: selectedDatasource,
                        onChange: handleDatasourceChange,
                        notched: true
                    })
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                        variant: "subtitle2",
                        sx: {
                            mb: 1,
                            fontWeight: 500,
                            color: theme.palette.text.secondary
                        },
                        children: "Query"
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
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
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_monacoeditor.default, {
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
