import { parseVariables } from '@perses-dev/plugin-system';
import { getTimeSeriesData } from './get-time-series-data';
import { HumanlogTimeSeriesQueryEditor } from './HumanlogTimeSeriesQueryEditor';
export const HumanlogTimeSeriesQuery = {
    getTimeSeriesData,
    OptionsEditorComponent: HumanlogTimeSeriesQueryEditor,
    createInitialOptions: ()=>({
            query: ''
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

//# sourceMappingURL=HumanlogTimeSeriesQuery.js.map