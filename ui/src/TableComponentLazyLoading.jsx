import * as React from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';

import LinearProgress from '@mui/material/LinearProgress';

const MAX_ROW_LENGTH = 500;

export default function InfiniteLoadingGrid(args) {
  const [loading, setLoading] = React.useState(false);
  const [loadedRows, setLoadedRows] = React.useState([]);
  const mounted = React.useRef(true);
  const {data} = {...args}

  const loadServerRows = async (newRowLength) => {
    setLoading(true);
    var newData = await args.loadMoreData()

    if (mounted.current) {
      setLoading(false);
      setLoadedRows(loadedRows.values.concat(newData.values));
    }
  };

  const handleOnRowsScrollEnd = (params) => {
    if (loadedRows.length <= MAX_ROW_LENGTH) {
        
      loadServerRows(params.viewportPageSize);
    }
  };

  React.useEffect(() => {
    return () => {
      mounted.current = true;
    };
  }, []);

  const columns = data.columns.map((x,index)=>{return {field:x, headerName:x.toUpperCase(), editable: true}});
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGridPro
        {...data.values}
        rows={data.values.concat(loadedRows.values)}
        columns={columns}
        loading={loading}
        hideFooterPagination
        onRowsScrollEnd={handleOnRowsScrollEnd}
        components={{
          LoadingOverlay: LinearProgress,
        }}
      />
    </div>
  );
}