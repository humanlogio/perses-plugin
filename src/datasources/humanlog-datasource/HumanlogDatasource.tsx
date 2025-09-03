import { DatasourcePlugin } from "@perses-dev/plugin-system";
import {
  HumanlogDatasourceSpec,
  HumanlogDatasourceClient,
} from "./humanlog-datasource-types";
import { HumanlogDatasourceEditor } from "./HumanlogDatasourceEditor";
import { createConnectTransport } from "@connectrpc/connect-web";
import { createClient as createConnectClient } from "@connectrpc/connect";
import { QueryService } from "api/js/svc/query/v1/service_pb";

const createClient: DatasourcePlugin<
  HumanlogDatasourceSpec,
  HumanlogDatasourceClient
>["createClient"] = (spec, options) => {
  const { directUrl } = spec;

  const datasourceUrl = directUrl;
  if (datasourceUrl === undefined) {
    throw new Error(
      "No URL specified for HumanlogDatasource client. You can use directUrl in the spec to configure it.",
    );
  }

  const transport = createConnectTransport({ baseUrl: datasourceUrl });
  const queryClient = createConnectClient(QueryService, transport);

  return {
    options: {
      datasourceUrl,
    },
    query: async (params, headers) => {
      try {
        const parsed = await queryClient.parse({ query: params.query });
        const result = await queryClient.query({ query: parsed.query });
        return {
          status: result.data ? "success" : "error",
          data: result,
        };
      } catch (e) {
        console.error("Invalid response from server", e);
        throw new Error("Invalid response from server: " + e);
      }
    },
  };
};

export const HumanlogDatasource: DatasourcePlugin<
  HumanlogDatasourceSpec,
  HumanlogDatasourceClient
> = {
  createClient,
  OptionsEditorComponent: HumanlogDatasourceEditor,
  createInitialOptions: () => ({ directUrl: "http://localhost:32764" }),
};
