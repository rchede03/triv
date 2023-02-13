import React, { Component } from 'react'
import { DataGrid } from '@mui/x-data-grid';

class TableComponent extends Component {
    state={rowsPerPage:10}
    getRows = ()=>{
        const cols = this.props.data.columns
        cols.push("id")
        return this.props.data.values.map((x,index)=> {
            var retVal = {}
            for(var counter = 0;counter<cols.length;counter++){
                retVal[cols[counter]] = x[counter]
            }
            retVal["id"]=index;
            return retVal;
        });
    }
generateTable = ()=>{
    if(this.props.data.columns && this.props.data.columns.length>0){
    const columns = this.props.data.columns.map((x,index)=>{return {field:x, headerName:x.toUpperCase(), editable: true}});
    const rows = this.getRows();
    return  <DataGrid
    rowsPerPageOptions={[5, 10, 25]}
    autoHeight={10}
    rows={rows}
    columns={columns}
    count={rows.length}
    rowsPerPage={this.state.rowsPerPage}
    onRowsPerPageChange={(event)=>this.setState({ rowsPerPage: parseInt(event.target.value, 10) })}
    checkboxSelection
    />
    }
}
    render() { 
        return (this.generateTable());
    }
}
 
export default TableComponent;