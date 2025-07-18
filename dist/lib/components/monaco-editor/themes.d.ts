import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
export declare enum ThemeName {
    light = "humanlogql-light",
    dark = "humanlogql-dark"
}
interface Theme {
    name: ThemeName;
    data: monaco.editor.IStandaloneThemeData;
}
export declare const themes: Theme[];
export {};
//# sourceMappingURL=themes.d.ts.map