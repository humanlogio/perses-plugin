"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HumanlogDatasource", {
    enumerable: true,
    get: function() {
        return HumanlogDatasource;
    }
});
const _HumanlogDatasourceEditor = require("./HumanlogDatasourceEditor");
const _connectweb = require("@connectrpc/connect-web");
const _service_connect = require("api/js/svc/query/v1/service_connect");
const _connect = require("@connectrpc/connect");
const createClient = (spec, options)=>{
    const { directUrl } = spec;
    const datasourceUrl = directUrl;
    if (datasourceUrl === undefined) {
        throw new Error("No URL specified for HumanlogDatasource client. You can use directUrl in the spec to configure it.");
    }
    const transport = (0, _connectweb.createConnectTransport)({
        baseUrl: datasourceUrl
    });
    const queryClient = (0, _connect.createClient)(_service_connect.QueryService, transport);
    return {
        options: {
            datasourceUrl
        },
        query: async (params, headers)=>{
            try {
                const parsed = await queryClient.parse({
                    query: params.query
                });
                const result = await queryClient.query({
                    query: parsed.query
                });
                return {
                    status: result.data ? "success" : "error",
                    data: result
                };
            } catch (e) {
                console.error("Invalid response from server", e);
                throw new Error("Invalid response from server: " + e);
            }
        }
    };
};
const HumanlogDatasource = {
    createClient,
    OptionsEditorComponent: _HumanlogDatasourceEditor.HumanlogDatasourceEditor,
    createInitialOptions: ()=>({
            directUrl: "http://localhost:32764"
        })
};
