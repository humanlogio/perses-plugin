import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DatasourceSelect, isVariableDatasource } from "@perses-dev/plugin-system";
import { useEffect, useState } from "react";
import { DATASOURCE_KIND, DEFAULT_DATASOURCE } from "../constants";
export function HumanlogTraceQueryEditor(props) {
    const { onChange, value } = props;
    const { datasource } = value;
    const selectedDatasource = datasource ?? DEFAULT_DATASOURCE;
    const [localQuery, setLocalQuery] = useState(value.query);
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
    const handleQueryBlur = (event)=>{
        const newQuery = event.target.value;
        if (newQuery !== value.query) {
            onChange({
                ...value,
                query: newQuery
            });
        }
    };
    useEffect(()=>{
        setLocalQuery(value.query);
    }, [
        value.query
    ]);
    return /*#__PURE__*/ _jsxs("div", {
        children: [
            /*#__PURE__*/ _jsx("label", {
                children: "HumanlogTraceQuery Datasource"
            }),
            /*#__PURE__*/ _jsx(DatasourceSelect, {
                datasourcePluginKind: DATASOURCE_KIND,
                value: selectedDatasource,
                onChange: handleDatasourceChange,
                label: "HumanlogTraceQuery Datasource",
                notched: true
            }),
            /*#__PURE__*/ _jsx("input", {
                onBlur: handleQueryBlur,
                onChange: (e)=>setLocalQuery(e.target.value),
                placeholder: "query",
                value: localQuery
            })
        ]
    });
}

//# sourceMappingURL=HumanlogTraceQueryEditor.js.map