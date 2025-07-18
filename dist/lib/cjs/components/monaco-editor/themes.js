// largely lifted from https://github.com/Azure/monaco-kusto/tree/master/package/src/syntaxHighlighting
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get ThemeName () {
        return ThemeName;
    },
    get themes () {
        return themes;
    }
});
const _types = require("./types");
var ThemeName = /*#__PURE__*/ function(ThemeName) {
    ThemeName["light"] = "humanlogql-light";
    ThemeName["dark"] = "humanlogql-dark";
    return ThemeName;
}({});
const colors = {
    white: "#DCDCDC",
    softGold: "#D7BA7D",
    paleChestnut: "#D69D85",
    paleVioletRed: "#DB7093",
    firebrick: "#B22222",
    orangeRed: "#FF4500",
    mediumVioletRed: "#C71585",
    magenta: "#FF00FF",
    midnightBlue: "#191970",
    blue: "#0000FF",
    blueSapphire: "#004E8C",
    tealBlue: "#2B91AF",
    skyBlue: "#569CD6",
    lightSkyBlue: "#92CAF4",
    mediumTurquoise: "#4EC9B0",
    oliveDrab: "#608B4E",
    green: "#008000",
    jetBlack: "#1B1A19",
    black: "#000000"
};
const light = {
    base: "vs",
    inherit: true,
    rules: [
        {
            token: "",
            foreground: colors.black
        },
        {
            token: _types.Token.PlainText,
            foreground: colors.black
        },
        {
            token: _types.Token.Comment,
            foreground: colors.green
        },
        {
            token: _types.Token.Punctuation,
            foreground: colors.black
        },
        {
            token: _types.Token.Literal,
            foreground: colors.black
        },
        {
            token: _types.Token.StringLiteral,
            foreground: colors.firebrick
        },
        {
            token: _types.Token.Type,
            foreground: colors.blue
        },
        {
            token: _types.Token.Column,
            foreground: colors.mediumVioletRed
        },
        {
            token: _types.Token.Function,
            foreground: colors.blue
        },
        {
            token: _types.Token.Parameter,
            foreground: colors.midnightBlue
        },
        {
            token: _types.Token.Variable,
            foreground: colors.midnightBlue
        },
        {
            token: _types.Token.Identifier,
            foreground: colors.black
        },
        {
            token: _types.Token.QueryParameter,
            foreground: colors.tealBlue
        },
        {
            token: _types.Token.ScalarParameter,
            foreground: colors.blue
        },
        {
            token: _types.Token.MathOperator,
            foreground: colors.black
        },
        {
            token: _types.Token.QueryOperator,
            foreground: colors.orangeRed
        },
        {
            token: _types.Token.Command,
            foreground: colors.blue
        },
        {
            token: _types.Token.Keyword,
            foreground: colors.blue
        }
    ],
    colors: {}
};
const dark = {
    base: "vs-dark",
    inherit: true,
    rules: [
        {
            token: "",
            foreground: colors.white
        },
        {
            token: _types.Token.PlainText,
            foreground: colors.white
        },
        {
            token: _types.Token.Comment,
            foreground: colors.oliveDrab
        },
        {
            token: _types.Token.Punctuation,
            foreground: colors.white
        },
        {
            token: _types.Token.Literal,
            foreground: colors.white
        },
        {
            token: _types.Token.StringLiteral,
            foreground: colors.paleChestnut
        },
        {
            token: _types.Token.Type,
            foreground: colors.skyBlue
        },
        {
            token: _types.Token.Column,
            foreground: colors.paleVioletRed
        },
        {
            token: _types.Token.Function,
            foreground: colors.skyBlue
        },
        {
            token: _types.Token.Parameter,
            foreground: colors.lightSkyBlue
        },
        {
            token: _types.Token.Variable,
            foreground: colors.lightSkyBlue
        },
        {
            token: _types.Token.Identifier,
            foreground: colors.white
        },
        {
            token: _types.Token.QueryParameter,
            foreground: colors.tealBlue
        },
        {
            token: _types.Token.ScalarParameter,
            foreground: colors.skyBlue
        },
        {
            token: _types.Token.MathOperator,
            foreground: colors.white
        },
        {
            token: _types.Token.QueryOperator,
            foreground: colors.mediumTurquoise
        },
        {
            token: _types.Token.Command,
            foreground: colors.skyBlue
        },
        {
            token: _types.Token.Keyword,
            foreground: colors.skyBlue
        }
    ],
    colors: {
        "editor.background": "#000000",
        "editorSuggestWidget.selectedBackground": colors.blueSapphire
    }
};
const themes = [
    {
        name: "humanlogql-light",
        data: light
    },
    {
        name: "humanlogql-dark",
        data: dark
    }
];
