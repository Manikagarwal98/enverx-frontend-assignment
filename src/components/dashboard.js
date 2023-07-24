import React, { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
function Dashboard(){
    const columns = [
        { field: 'id', headerName: 'id', width: 180, hide:true},
        { field: 'Number', headerName: 'Application Number', width: 205 },
        { field: 'Name', headerName: 'Name', width: 115 },
        { field: 'Date', headerName: 'Application Type', width: 183},
        { field: 'Nme', headerName: 'Created On', width: 150 },
        { field: 'City', headerName: 'Loan Product', width: 165 },
        { field: 'Source', headerName: 'Mode of Submission', width: 210 },
        { field: 'Status', headerName: 'Submitted on', width: 165 },
        { field: 'Last', headerName: 'Status', width: 120},
        { field: 'ViewFlows', headerName: 'Action', width: 120 }
    ]

    const [rows,setRows] = useState([
        {id:1,
        Number:"Banking Customer Segmentation", 
        descriptionName:"Segmenting Private Banking Customer to enable product launch",
        username:"Sandeep Ranjan",
        taskname:"Clustering", 
        projectCategories:"Clustering", 
        projectCategories:"Marketing",
        modelsTrained:"10",
        createdOn:"27th April 2020",
        lastModifiedon:"29th April 2020",}])

return(<div>
 <div className="table-responsive DataGrid">
                      <DataGrid
                            headerHeight={40}
                            rowHeight={38}
                            className="customDataGrid globalDataGridRoot"
                            rows={rows}
                            columns={columns}
                            hideFooter={true}
                        />
                      </div>
</div>)
}
export default Dashboard