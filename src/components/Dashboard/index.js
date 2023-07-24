import React, { useEffect, useState } from 'react';
import { DataGrid, getDataGridUtilityClass } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import { connect } from 'react-redux';  
import './dashboard.css'
import TransactionForm from '../Transaction';
import { useDispatch, useSelector } from 'react-redux';
import { getBalanceAction, getTransactionsAction } from '../../action';
function Dashboard(props) {

    const columns = [
        { field: 'date', headerName: 'Date', flex: 1 },
        { field: 'time', headerName: 'Time', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 5 },
        { field: 'category', headerName: 'category', flex: 1 },
        { field: 'credit', headerName: 'Credit', flex: 1 },
        { field: 'debit', headerName: 'Debit', flex: 1 },
    ]

    const [IsActive, SetIsActive] = useState(false);
    const [type, SetType] = useState("")
    const [rows, setRows] = useState([]);
    const [sortModel, setSortModel] = useState([
        {
            field: 'date',
            sort: 'desc',
        },
    ]);
    const dispatch = useDispatch();
    const [reportData,setReportData] = useState({})
    const fetchData = async () => {
        try {

          const transactions = await dispatch(getTransactionsAction());
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
      };
    useEffect(() => {
     
      fetchData();
    }, [dispatch,IsActive]);
  
    useEffect(() => {
      const fetchBalance = async () => {
        try {
      
          const balance = await dispatch(getBalanceAction());
        
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      };
      fetchBalance();
    }, [dispatch]);
  
  
    useEffect(()=>{
        if(props.userdata != undefined){
        setRows(props.userdata)}
        if(props.total != undefined){
            setReportData(props.total[0])}
        
    },[props.userdata,props.total,IsActive])
    const toggleTransaction = (e) => {
        SetIsActive(!IsActive)
        SetType(e.target.name);
    }

   const convertToCSV = (data) => {
       let head= []
       columns.forEach(a=> head.push(a.field))
    const headers = head;
    const rows = data.map((row) => {
      return headers.map((header) => {
        return row[header] !== undefined ? row[header] : ''; 
      }).join(',');
    });

    return [headers.join(','), ...rows].join('\n');
  };
    const downloadReport = () => {
        const csvData = convertToCSV(rows);
    
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', "Report");
        link.click();
    
        URL.revokeObjectURL(url);
    }
    return (<div className='container'>
        <div className='summary col-md-12'>
            <div className='summaryItem col-md-3 btn-primary'>
                <div>
                    <p>Credit</p>
                    <h3>{reportData.credit}</h3>
                </div>
            </div>
            <h1 className='col-md-1'>-</h1>
            <div className='summaryItem col-md-3 btn-secondry'>
                <div>
                    <p>Debit</p>
                    <h3>{reportData.debit}</h3>
                </div>
            </div>
            <h1 className='col-md-1'>=</h1>
            <div className='summaryItem col-md-3 btn-equal'>
                <div>
                    <p>Balance</p>
                    <h3>{reportData.balance}</h3>
                </div>
            </div>

        </div>
        <div className='buttonContainer'>
            <Button variant="contained" onClick={e => downloadReport(e)}>
                Download Transaction Report
            </Button>
            <Stack direction="row" spacing={2}>
                <Button color="success" variant="contained" margin="5px" name='Credit' onClick={e => toggleTransaction(e)}>
                    Credit
                </Button>
                <Button color="error" variant="contained" name='Debit' onClick={e => toggleTransaction(e)}>
                    Debit
                </Button>
            </Stack>

        </div>
        <div className="table-responsive DataGrid">
            <DataGrid
                headerHeight={40}
                rowHeight={38}
                className="customDataGrid globalDataGridRoot"
                rows={rows}
                columns={columns}
                sortModel={sortModel}
                onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
                autoHeight={true}
            />
        </div>
        <TransactionForm IsActive={IsActive} SetIsActive={SetIsActive} trType={type} />
    </div>)
}
const getPropsData = state =>{
    return {userdata:state.app.transactions,
        total:state.app.total
    }}

export default connect(getPropsData,{getTransactionsAction,getBalanceAction})(Dashboard)