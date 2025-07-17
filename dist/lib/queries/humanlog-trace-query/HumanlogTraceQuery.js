import { parseVariables } from "@perses-dev/plugin-system";
import { getTraceData } from "./get-trace-data";
import { HumanlogTraceQueryEditor } from "./HumanlogTraceQueryEditor";
export const HumanlogTraceQuery = {
    getTraceData,
    OptionsEditorComponent: HumanlogTraceQueryEditor,
    createInitialOptions: ()=>({
            query: ""
        }),
    dependsOn: (spec)=>{
        const queryVariables = parseVariables(spec.query);
        const allVariables = [
            ...new Set([
                ...queryVariables
            ])
        ];
        return {
            variables: allVariables
        };
    }
};

//# sourceMappingURL=HumanlogTraceQuery.js.map