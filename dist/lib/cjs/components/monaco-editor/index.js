"use client";
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_default(require("@monaco-editor/react"));
const _react1 = require("react");
const _editorapi = require("monaco-editor/esm/vs/editor/editor.api");
const _globals = require("./globals");
const _monarch = require("./monarch");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const defaultOptions = {
    automaticLayout: true,
    minimap: {
        enabled: false
    },
    lineNumbers: "off",
    overviewRulerBorder: false,
    overviewRulerLanes: 0,
    hideCursorInOverviewRuler: true,
    renderLineHighlight: "none",
    scrollbar: {
        vertical: "auto",
        horizontal: "auto",
        verticalScrollbarSize: 8,
        horizontalScrollbarSize: 8,
        useShadows: false
    },
    scrollBeyondLastLine: false,
    padding: {
        top: 8,
        bottom: 8
    },
    fontSize: 14,
    lineHeight: 20,
    contextmenu: false,
    selectOnLineNumbers: false,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    wordWrap: "off",
    quickSuggestions: true,
    parameterHints: {
        enabled: true
    },
    suggestOnTriggerCharacters: true
};
const MonacoEditor = ({ width = "100%", height = 60, value, onChange, onMount, options, ...props })=>{
    const editorRef = (0, _react1.useRef)(null);
    const monacoRef = (0, _react1.useRef)(null);
    const [dynamicHeight, setDynamicHeight] = (0, _react1.useState)(height);
    const mergedOptions = {
        ...defaultOptions,
        ...options
    };
    const handleResize = (0, _react1.useCallback)(()=>{
        if (editorRef.current) {
            editorRef.current.layout();
        }
    }, []);
    // Auto-resize based on content
    (0, _react1.useEffect)(()=>{
        if (editorRef.current && value) {
            const lineCount = value.split("\n").length;
            const minHeight = 60;
            const maxHeight = 200;
            const lineHeight = 18;
            const padding = 10;
            const calculatedHeight = Math.min(Math.max(lineCount * lineHeight + padding, minHeight), maxHeight);
            setDynamicHeight(calculatedHeight);
        } else {
            setDynamicHeight(height);
        }
    }, [
        value,
        height
    ]);
    // Recalculate height on mount to handle modal scenarios
    (0, _react1.useEffect)(()=>{
        if (value) {
            const lineCount = value.split("\n").length;
            const minHeight = 60;
            const maxHeight = 200;
            const lineHeight = 18;
            const padding = 10;
            const calculatedHeight = Math.min(Math.max(lineCount * lineHeight + padding, minHeight), maxHeight);
            setDynamicHeight(calculatedHeight);
        }
    }, []); // Run only on mount
    // Update editor layout when height changes
    (0, _react1.useEffect)(()=>{
        if (editorRef.current) {
            editorRef.current.layout();
        }
    }, [
        dynamicHeight
    ]);
    const handleEditorDidMount = (editor, monaco)=>{
        editorRef.current = editor;
        monacoRef.current = monaco;
        editor.getModel()?.updateOptions({
            tabSize: 2
        });
        editor.updateOptions(defaultOptions);
        // initialize the layout
        editor.layout();
        monaco.editor.defineTheme("humanlogql-dark", {
            base: "vs-dark",
            inherit: true,
            rules: [],
            colors: {
                "editor.background": "#000000"
            }
        });
        monaco.editor.defineTheme("humanlogql-light", {
            base: "vs",
            inherit: true,
            rules: [],
            colors: {
                "editor.background": "#FFFFFF"
            }
        });
        monaco.languages.register({
            id: _globals.LANGUAGE_ID
        });
        monaco.languages.setLanguageConfiguration(_globals.LANGUAGE_ID, languageConfiguration);
        monaco.languages.setMonarchTokensProvider(_globals.LANGUAGE_ID, _monarch.humanlogqlLanguageDefinition);
        monaco.languages.registerCompletionItemProvider(_globals.LANGUAGE_ID, {
            triggerCharacters: [
                "[",
                "|"
            ],
            provideCompletionItems: async (model, position, context, token)=>{
                let suggestions = [];
                switch(context.triggerKind){
                    case _editorapi.languages.CompletionTriggerKind.Invoke:
                        suggestions.push(...defaultColumnsSuggestions(model, position));
                        break;
                    default:
                        break;
                }
                return {
                    suggestions: suggestions
                };
            }
        });
        onMount?.(editor, monaco);
    };
    // detect resizing event
    (0, _react1.useEffect)(()=>{
        window.addEventListener("resize", handleResize);
        return ()=>{
            window.removeEventListener("resize", handleResize);
        };
    }, [
        handleResize
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_react.default, {
        width: width,
        height: dynamicHeight,
        defaultLanguage: _globals.LANGUAGE_ID,
        value: value,
        onChange: onChange,
        options: mergedOptions,
        onMount: handleEditorDidMount,
        loading: /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
            children: "Loading Editor..."
        }),
        ...props
    });
};
// largely lifted from https://github.com/Azure/monaco-kusto/tree/master/package/src/syntaxHighlighting
const languageConfiguration = {
    folding: {
        offSide: false,
        markers: {
            start: /^\s*[\r\n]/gm,
            end: /^\s*[\r\n]/gm
        }
    },
    comments: {
        lineComment: "//",
        blockComment: null
    },
    autoClosingPairs: [
        {
            open: "{",
            close: "}"
        },
        {
            open: "[",
            close: "]"
        },
        {
            open: "(",
            close: ")"
        },
        {
            open: "'",
            close: "'",
            notIn: [
                "string",
                "comment"
            ]
        },
        {
            open: '"',
            close: '"',
            notIn: [
                "string",
                "comment"
            ]
        }
    ],
    brackets: [
        [
            "[",
            "]"
        ],
        [
            "{",
            "}"
        ],
        [
            "(",
            ")"
        ]
    ],
    colorizedBracketPairs: []
};
const rangeForModelPos = (model, pos, keyword)=>{
    const word = model.getWordUntilPosition(pos);
    return {
        startLineNumber: pos.lineNumber,
        endLineNumber: pos.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
    };
};
const defaultColumnsSuggestions = (model, pos)=>{
    // find out if we are completing a property in the 'dependencies' object.
    return [
        {
            label: {
                label: "machine",
                detail: " machine that emitted the log event"
            },
            kind: _editorapi.languages.CompletionItemKind.Property,
            insertText: "machine",
            documentation: "The machine on which a log was recorded.",
            range: rangeForModelPos(model, pos, "machine")
        },
        {
            label: {
                label: "session",
                detail: " session of a log event"
            },
            kind: _editorapi.languages.CompletionItemKind.Property,
            insertText: "session",
            documentation: "The session during which a log was recorded. Sessions roughly map to processes, or a single invocation of `humanlog`. Sessions are unique only within a machine.",
            range: rangeForModelPos(model, pos, "machine")
        },
        {
            label: {
                label: "event",
                detail: " event is an identifier for a log event"
            },
            kind: _editorapi.languages.CompletionItemKind.Property,
            insertText: "event",
            documentation: "The event during which a log was recorded. Events roughly map to log lines ingested by `humanlog`. Events are unique and ordered only within a (machine, session) pair. No global order exists.",
            range: rangeForModelPos(model, pos, "event")
        },
        {
            label: {
                label: "parsed_at",
                detail: " parsed_at is the timestamp when the log event was parsed"
            },
            kind: _editorapi.languages.CompletionItemKind.Property,
            insertText: "parsed_at",
            documentation: "The timestamp when the log event was parsed in `humanlog`.",
            range: rangeForModelPos(model, pos, "parsed_at")
        },
        {
            label: {
                label: "raw",
                detail: " raw is the raw content of the log event"
            },
            kind: _editorapi.languages.CompletionItemKind.Property,
            insertText: "raw",
            documentation: "The full unparsed content of the log event.",
            range: rangeForModelPos(model, pos, "raw")
        },
        {
            label: {
                label: "ts",
                detail: " ts is a timestamp for a log event"
            },
            kind: _editorapi.languages.CompletionItemKind.Property,
            insertText: "ts",
            documentation: "The ts found in a log event, if parsed in `humanlog`. When no timestamp is found, the default timestamp is the time of parsing. See `parsed_at`.",
            range: rangeForModelPos(model, pos, "ts")
        },
        {
            label: {
                label: "lvl",
                detail: " lvl is a log level"
            },
            kind: _editorapi.languages.CompletionItemKind.Property,
            insertText: "lvl",
            documentation: "The log level found in a log event, if parsed in `humanlog`. Usually one of `debug`, `info`, `warn`, `error`, `panic` or `fatal`.",
            range: rangeForModelPos(model, pos, "lvl")
        },
        {
            label: {
                label: "msg",
                detail: " msg is the main message a log event"
            },
            kind: _editorapi.languages.CompletionItemKind.Property,
            insertText: "msg",
            documentation: "The message found in a log event, if parsed in `humanlog`.",
            range: rangeForModelPos(model, pos, "msg")
        },
        {
            label: {
                label: "kv",
                detail: " kv are key-values in a log event"
            },
            kind: _editorapi.languages.CompletionItemKind.Property,
            insertText: "kv",
            documentation: "The key-values found in a log event, if parsed in `humanlog`.",
            range: rangeForModelPos(model, pos, "kv")
        }
    ];
};
const symbolsSuggestions = (model, pos, symbols)=>{
    const word = model.getWordUntilPosition(pos);
    const range = {
        startLineNumber: pos.lineNumber,
        endLineNumber: pos.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
    };
    return symbols.map((sym)=>{
        return {
            label: sym.name,
            kind: _editorapi.languages.CompletionItemKind.Variable,
            insertText: "['" + sym.name + "']",
            range: rangeForModelPos(model, pos, "['" + sym.name + "']")
        };
    });
};
const tableOperatorSuggestions = (model, pos)=>{
    const word = model.getWordUntilPosition(pos);
    const range = {
        startLineNumber: pos.lineNumber,
        endLineNumber: pos.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
    };
    return [
        {
            label: {
                label: "filter",
                detail: " filter <expr>"
            },
            kind: _editorapi.languages.CompletionItemKind.Operator,
            insertText: "filter",
            range: rangeForModelPos(model, pos, "filter")
        },
        {
            label: {
                label: "summarize",
                detail: " summarize [(<id> = )? <aggregate_func>]+ by [(<id> = )? <expr>]+"
            },
            kind: _editorapi.languages.CompletionItemKind.Operator,
            insertText: "summarize",
            range: rangeForModelPos(model, pos, "summarize")
        },
        {
            label: {
                label: "project",
                detail: " project [(<id> = )? <expr>]+"
            },
            kind: _editorapi.languages.CompletionItemKind.Operator,
            insertText: "project",
            range: rangeForModelPos(model, pos, "project")
        },
        {
            label: {
                label: "project-away",
                detail: " project-away [(<id> = )? <expr>]+"
            },
            kind: _editorapi.languages.CompletionItemKind.Operator,
            insertText: "project-away",
            range: rangeForModelPos(model, pos, "project-away")
        },
        {
            label: {
                label: "project-keep",
                detail: " project-keep [(<id> = )? <expr>]+"
            },
            kind: _editorapi.languages.CompletionItemKind.Operator,
            insertText: "project-keep",
            range: rangeForModelPos(model, pos, "project-keep")
        },
        {
            label: {
                label: "extend",
                detail: " extend [(<id> = )? <expr>]+"
            },
            kind: _editorapi.languages.CompletionItemKind.Operator,
            insertText: "extend",
            range: rangeForModelPos(model, pos, "extend")
        },
        {
            label: {
                label: "count",
                detail: " count"
            },
            kind: _editorapi.languages.CompletionItemKind.Operator,
            insertText: "count",
            range: rangeForModelPos(model, pos, "count")
        },
        {
            label: {
                label: "distinct",
                detail: " distinct <id>[, <id>]*"
            },
            kind: _editorapi.languages.CompletionItemKind.Operator,
            insertText: "distinct",
            range: rangeForModelPos(model, pos, "distinct")
        },
        {
            label: {
                label: "sample",
                detail: " sample <i64>"
            },
            kind: _editorapi.languages.CompletionItemKind.Operator,
            insertText: "sample",
            range: rangeForModelPos(model, pos, "sample")
        },
        {
            label: {
                label: "search",
                detail: " search <search-predicate>"
            },
            kind: _editorapi.languages.CompletionItemKind.Operator,
            insertText: "search",
            range: rangeForModelPos(model, pos, "search")
        },
        {
            label: {
                label: "sort",
                detail: " sort by <id> (asc|desc)? [, <id> (asc|desc)?]*"
            },
            kind: _editorapi.languages.CompletionItemKind.Operator,
            insertText: "sort by",
            range: rangeForModelPos(model, pos, "sort by")
        },
        {
            label: {
                label: "take",
                detail: " take <i64>"
            },
            kind: _editorapi.languages.CompletionItemKind.Operator,
            insertText: "take",
            range: rangeForModelPos(model, pos, "take")
        },
        {
            label: {
                label: "top",
                detail: " top <i64> by <expr> (asc|desc)?"
            },
            kind: _editorapi.languages.CompletionItemKind.Operator,
            insertText: "top",
            range: rangeForModelPos(model, pos, "top")
        },
        {
            label: {
                label: "render split by",
                detail: " render split by <expr> [, <expr>]*"
            },
            kind: _editorapi.languages.CompletionItemKind.Operator,
            insertText: "render split by",
            range: rangeForModelPos(model, pos, "render split by")
        }
    ];
};
const _default = MonacoEditor;
