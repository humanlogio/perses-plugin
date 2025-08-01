// if someone wants to tweak this, have fun with:
// -> https://microsoft.github.io/monaco-editor/monarch.html
// largely lifted from https://github.com/Azure/monaco-kusto/tree/master/package/src/syntaxHighlighting
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "humanlogqlLanguageDefinition", {
    enumerable: true,
    get: function() {
        return humanlogqlLanguageDefinition;
    }
});
const _globals = require("./globals");
const _types = require("./types");
// todo: pull the actual operator list
// from the reference
const queryOperators = [
    "as",
    "consume",
    "distinct",
    "evaluate",
    "extend",
    "getschema",
    "graph-match",
    "graph-merge",
    "graph-to-table",
    "invoke",
    "join",
    "limit",
    "lookup",
    "make-graph",
    "make-series",
    "mv-apply",
    "mv-expand",
    "order",
    "parse",
    "parse-kv",
    "parse-where",
    "project",
    "project-away",
    "project-keep",
    "project-rename",
    "project-reorder",
    "range",
    "reduce",
    "render",
    "sample",
    "sample-distinct",
    "scan",
    "serialize",
    "sort",
    "summarize",
    "take",
    "top",
    "top-hitters",
    "top-nested",
    "union",
    "where",
    "filter",
    "fork",
    "facet",
    "range",
    "consume",
    "find",
    "search",
    "print",
    "partition",
    "lookup"
];
const queryParameters = [
    "kind"
];
// todo: pull the types from the reference
const types = [
    "bool",
    "datetime",
    "decimal",
    "double",
    "dynamic",
    "guid",
    "int",
    "long",
    "real",
    "string",
    "timespan"
];
// todo: pull the actual function list
// from the reference
const functions = [
    "abs",
    "acos",
    "ago",
    "array_concat",
    "array_length",
    "array_slice",
    "array_split",
    "asin",
    "atan",
    "atan2",
    "avg",
    "bag_keys",
    "base64_decodestring",
    "base64_encodestring",
    "bin",
    "bin_at",
    "binary_and",
    "binary_not",
    "binary_or",
    "binary_shift_left",
    "binary_shift_right",
    "binary_xor",
    "case",
    "ceiling",
    "coalesce",
    "columnifexists",
    "cos",
    "count",
    "countof",
    "cot",
    "cursor_after",
    "datatable",
    "datepart",
    "datetime_add",
    "datetime_diff",
    "datetime_part",
    "dayofmonth",
    "dayofweek",
    "dayofyear",
    "dcount",
    "dcount_hll",
    "degrees",
    "endofday",
    "endofmonth",
    "endofweek",
    "endofyear",
    "exp",
    "exp10",
    "exp2",
    "extract",
    "extractall",
    "extractjson",
    "format_datetime",
    "format_timespan",
    "floor",
    "gamma",
    "geo_distance_2points",
    "geo_geohash_to_central_point",
    "geo_point_in_circle",
    "geo_point_in_polygon",
    "geo_point_to_geohash",
    "getmonth",
    "gettype",
    "getyear",
    "hash",
    "hash_sha256",
    "hll_merge",
    "iif",
    "indexof",
    "isempty",
    "isfinite",
    "isinf",
    "isascii",
    "isnan",
    "isnotempty",
    "isnotnull",
    "isnull",
    "isutf8",
    "log",
    "log10",
    "log2",
    "loggamma",
    "make_datetime",
    "make_string",
    "make_timespan",
    "materialize",
    "max",
    "max_of",
    "min",
    "min_of",
    "monthofyear",
    "next",
    "not",
    "pack",
    "pack_array",
    "pack_dictionary",
    "parse_csv",
    "parse_ipv4",
    "parse_json",
    "parse_path",
    "parse_url",
    "parse_urlquery",
    "parse_user_agent",
    "parse_version",
    "parse_xml",
    "parsejson",
    "percentrank_tdigest",
    "percentile_tdigest",
    "pow",
    "prev",
    "radians",
    "rand",
    "rank_tdigest",
    "repeat",
    "replace",
    "reverse",
    "round",
    "row_cumsum",
    "row_window_session",
    "series_add",
    "series_decompose",
    "series_decompose_anomalies",
    "series_decompose_forecast",
    "series_divide",
    "series_equals",
    "series_fill_backward",
    "series_fill_const",
    "series_fill_forward",
    "series_fill_linear",
    "series_fir",
    "series_fit_2lines",
    "series_fit_2lines_dynamic",
    "series_fit_line",
    "series_fit_line_dynamic",
    "series_greater",
    "series_greater_equals",
    "series_iir",
    "series_less",
    "series_less_equals",
    "series_multiply",
    "series_not_equals",
    "series_outliers",
    "series_pearson_correlation",
    "series_periods_detect",
    "series_periods_validate",
    "series_seasonal",
    "series_stats",
    "series_stats_dynamic",
    "series_subtract",
    "sign",
    "sin",
    "split",
    "sqrt",
    "startofday",
    "startofmonth",
    "startofweek",
    "startofyear",
    "strcat",
    "strcat_array",
    "strcat_delim",
    "strcmp",
    "strlen",
    "strrep",
    "string_size",
    "substring",
    "sum",
    "tan",
    "tdigest_merge",
    "tobool",
    "toboolean",
    "todecimal",
    "todouble",
    "todynamic",
    "tofloat",
    "toguid",
    "tohex",
    "toint",
    "tolong",
    "tolower",
    "toobject",
    "toreal",
    "toscalar",
    "tostring",
    "totimespan",
    "toupper",
    "translate",
    "trim",
    "trim_end",
    "trim_start",
    "typeof",
    "url_decode",
    "url_encode",
    "week_of_year",
    "welch_test"
];
const keywords = [
    "and",
    "as",
    "asc",
    "by",
    "contains",
    "count",
    "desc",
    "extend",
    "false",
    "filter",
    "find",
    "has",
    "in",
    "let",
    "not",
    "on",
    "or",
    "project",
    "project-away",
    "project-rename",
    "project-reorder",
    "project-keep",
    "rename",
    "summarize",
    "take",
    "to",
    "true",
    "where"
];
const humanlogqlLanguageDefinition = {
    name: _globals.LANGUAGE_ID,
    mimeTypes: [
        "text/humanlogql"
    ],
    displayName: "humanlogQL",
    defaultToken: "invalid",
    queryOperators,
    queryParameters,
    types,
    functions,
    keywords,
    tokenizer: {
        root: [
            [
                /(\/\/.*$)/,
                _types.Token.Comment
            ],
            [
                /[\(\)\{\}\|\[\]\:\=\,\<|\.\..]/,
                _types.Token.Punctuation
            ],
            [
                /[\+\-\*\/\%\!\<\<=\>\>=\=\==\!=\<>\:\;\,\=~\@\?\=>\!~]/,
                _types.Token.MathOperator
            ],
            [
                /"([^"\\]*(\\.[^"\\]*)*)"/,
                _types.Token.StringLiteral
            ],
            [
                /'([^"\\]*(\\.[^"\\]*)*)'/,
                _types.Token.StringLiteral
            ],
            [
                /[\w@#\-$\.]+/,
                {
                    cases: {
                        "@queryOperators": _types.Token.QueryOperator,
                        "@queryParameters": _types.Token.QueryParameter,
                        "@types": _types.Token.Type,
                        "@functions": _types.Token.Function,
                        "@keywords": _types.Token.Keyword,
                        "@default": _types.Token.Identifier
                    }
                }
            ]
        ]
    }
};
