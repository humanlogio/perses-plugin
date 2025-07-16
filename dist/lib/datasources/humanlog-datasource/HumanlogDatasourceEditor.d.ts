import { ReactElement } from "react";
import { HumanlogDatasourceSpec } from "./humanlog-datasource-types";
export interface HumanlogDatasourceEditorProps {
    value: HumanlogDatasourceSpec;
    onChange: (next: HumanlogDatasourceSpec) => void;
    isReadonly?: boolean;
}
export declare function HumanlogDatasourceEditor(props: HumanlogDatasourceEditorProps): ReactElement;
//# sourceMappingURL=HumanlogDatasourceEditor.d.ts.map