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
function HumanlogTraceQueryEditor(props) {
    const { onChange, value } = props;
    const { datasource } = value;
    const selectedDatasource = datasource ?? _constants.DEFAULT_DATASOURCE;
    const [localQuery, setLocalQuery] = (0, _react.useState)(value.query);
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
    const handleQueryBlur = (event)=>{
        const newQuery = event.target.value;
        if (newQuery !== value.query) {
            onChange({
                ...value,
                query: newQuery
            });
        }
    };
    (0, _react.useEffect)(()=>{
        setLocalQuery(value.query);
    }, [
        value.query
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)("label", {
                children: "HumanlogTraceQuery Datasource"
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.DatasourceSelect, {
                datasourcePluginKind: _constants.DATASOURCE_KIND,
                value: selectedDatasource,
                onChange: handleDatasourceChange,
                label: "HumanlogTraceQuery Datasource",
                notched: true
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)("input", {
                onBlur: handleQueryBlur,
                onChange: (e)=>setLocalQuery(e.target.value),
                placeholder: "query",
                value: localQuery
            })
        ]
    });
}
