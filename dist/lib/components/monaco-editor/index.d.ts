import { EditorProps, OnMount } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
interface MonacoEditorProps extends Omit<EditorProps, "theme"> {
    width?: number | string;
    height?: number;
    value: string;
    onChange?: (value: string | undefined) => void;
    onMount?: OnMount;
    options?: editor.IStandaloneEditorConstructionOptions;
}
declare const MonacoEditor: ({ width, height, value, onChange, onMount, options, ...props }: MonacoEditorProps) => import("react/jsx-runtime").JSX.Element;
export default MonacoEditor;
//# sourceMappingURL=index.d.ts.map