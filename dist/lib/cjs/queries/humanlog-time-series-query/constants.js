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
    get DATASOURCE_KIND () {
        return DATASOURCE_KIND;
    },
    get DEFAULT_DATASOURCE () {
        return DEFAULT_DATASOURCE;
    }
});
const DATASOURCE_KIND = "HumanlogDatasource";
const DEFAULT_DATASOURCE = {
    kind: DATASOURCE_KIND
};
