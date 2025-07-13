import { DatasourceSelect, DatasourceSelectProps, isVariableDatasource, OptionsEditorProps } from '@perses-dev/plugin-system';
import { ReactElement, useEffect, useState } from 'react';
import { HumanlogTimeSeriesQuerySpec } from './humanlog-time-series-query-types';
import { DATASOURCE_KIND, DEFAULT_DATASOURCE } from './constants';

type HumanlogTimeSeriesQueryEditorProps = OptionsEditorProps<HumanlogTimeSeriesQuerySpec>;

export function HumanlogTimeSeriesQueryEditor(props: HumanlogTimeSeriesQueryEditorProps): ReactElement {
  const { onChange, value } = props;
  const {datasource} = value;
  const selectedDatasource = datasource ?? DEFAULT_DATASOURCE;
  const [localQuery, setLocalQuery] = useState(value.query);

  const handleDatasourceChange: DatasourceSelectProps['onChange'] = (newDatasourceSelection) => {
    if(!isVariableDatasource(newDatasourceSelection) && newDatasourceSelection.kind === DATASOURCE_KIND) {
      onChange({ ...value, datasource: newDatasourceSelection });
      return;
    }

    throw new Error('Got unexpected non HumanlogTimeSeriesQuery datasource selection');
  };

  const handleQueryBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    if (newQuery !== value.query) {
      onChange({ ...value, query: newQuery });
    }
  };

  useEffect(() => {
    setLocalQuery(value.query);
  }, [value.query]);

  return (
    <div>
      <label>HumanlogTimeSeriesQuery Datasource</label>
      <DatasourceSelect
          datasourcePluginKind={DATASOURCE_KIND}
          value={selectedDatasource}
          onChange={handleDatasourceChange}
          label="HumanlogTimeSeriesQuery Datasource"
          notched
        />
      <input 
        onBlur={handleQueryBlur} 
        onChange={(e) => setLocalQuery(e.target.value)} 
        placeholder='query' 
        value={localQuery} />
    </div>
  );
}
