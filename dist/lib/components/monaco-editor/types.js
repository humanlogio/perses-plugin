// largely lifted from https://github.com/Azure/monaco-kusto/tree/master/package/src/syntaxHighlighting
export var Token = /*#__PURE__*/ function(Token) {
    Token["PlainText"] = "plainText";
    Token["Comment"] = "comment";
    Token["Punctuation"] = "punctuation";
    Token["Literal"] = "literal";
    Token["StringLiteral"] = "stringLiteral";
    Token["Type"] = "type";
    Token["Column"] = "column";
    Token["Function"] = "function";
    Token["Parameter"] = "parameter";
    Token["Variable"] = "variable";
    Token["Identifier"] = "identifier";
    Token["QueryParameter"] = "queryParameter";
    Token["ScalarParameter"] = "scalarParameter";
    Token["MathOperator"] = "mathOperator";
    Token["QueryOperator"] = "queryOperator";
    Token["Command"] = "command";
    Token["Keyword"] = "keyword";
    return Token;
}({});
export const tokenTypes = [
    "plainText",
    "comment",
    "punctuation",
    "literal",
    "stringLiteral",
    "type",
    "column",
    "function",
    "parameter",
    "variable",
    "identifier",
    "queryParameter",
    "scalarParameter",
    "mathOperator",
    "queryOperator",
    "command",
    "keyword"
];

//# sourceMappingURL=types.js.map