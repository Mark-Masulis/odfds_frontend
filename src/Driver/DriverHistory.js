import React from 'react'

import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom"
const rows = [
  { id: 1, col1: "Josh", col2: "20 min", col3: "000001", col4:"123 S Main Street", col5:"3/16/2023", col6:"Peter" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];

const columns = [
  { field: "col1", headerName: "Driver", width: 150 },
  { field: "col2", headerName: "ETA", width: 150 },
  { field: "col3", headerName: "Order Number", width: 150 },
  { field: "col4", headerName: "Customer Address", width: 300 },
  { field: "col5", headerName: "Date", width: 150 },
  { field: "col6", headerName: "Customer Name", width: 150 },
];

export default function DriverHistory(props) {


  
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          height: 300,
          width: "60%",
          display: "inline-block",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
        />
      </div>
    </div>
  );
}
