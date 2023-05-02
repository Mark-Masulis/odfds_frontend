import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  {
    field: 'id', headerName: 'Order ID', width: 70, sortable: false
  },
  {
    field: 'createdAt', headerName: 'Create Time', width: 180, sortable: false, valueFormatter: params => params.value ? new Date(params.value).toLocaleString() : ""
  },
  {
    field: 'estimatedDeliveryTime', headerName: 'Estimated Delivery Time', width: 180, sortable: false, valueFormatter: params => params.value ? new Date(params.value).toLocaleString() : ""
  },
  {
    field: 'actualDeliveryTime', headerName: 'Actual Deliver Time', width: 180, sortable: false, valueFormatter: params => params.value ? new Date(params.value).toLocaleString() : ""
  },
  {
    field: 'cost', headerName: 'Order Cost', width: 100, sortable: false, valueFormatter: params => "$" + params.value
  },
  {
    field: 'status', headerName: 'Order Status', width: 120, sortable: false
  },
  {
    field: 'customerAddress', headerName: 'Customer Address', width: 450, sortable: false, valueGetter: (params) => params.row.customerStreet + ", " + params.row.customerCity + ", " + params.row.customerState + " " + params.row.customerZipCode  
  },
  {
    field: 'customerName', headerName: 'Customer Name', width: 120, sortable: false
  },
  {
    field: 'customerEmail', headerName: 'Customer Email', width: 200, sortable: false
  },
  {
    field: 'customerPhone', headerName: 'Customer Phone', width: 150, sortable: false
  },
  {
    field: 'driverName', headerName: 'Driver Name', width: 120, sortable: false, valueGetter: (params) => params.row.driver ? params.row.driver.firstName + " " + params.row.driver.lastName : ""
  },
  {
    field: 'driverPhone', headerName: 'Driver Phone', width: 150, sortable: false, valueGetter: (params) => params.row.driver ? params.row.driver.phone : ""
  },
  {
    field: 'comment', headerName: 'Order Comment', width: 200, sortable: false
  }
]

export default function RestaurantOrders(props) {
  const [pageState, setPageState] = React.useState({
    isLoading: false,
    data: [],
    total: 0
  });

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 25,
  });

  React.useEffect(() => {
    const fetchData = async () => {
      console.log("ON");
      setPageState(old => ({ ...old, isLoading: true }));
      const response = await fetch(process.env.REACT_APP_API + "/restaurant/orders?pageSize=" + paginationModel.pageSize + "&page=" + (paginationModel.page + 1), {
        method: "GET",
        headers: {
          "content-type": "application/json",
          access_token: props.token,
        }
      });
      const jsonData = await response.json();
      setPageState(old => ({ ...old, isLoading: false, data: jsonData.data.data, total: jsonData.data.allCount }));
    }
    fetchData();
  }, [paginationModel.page, paginationModel.pageSize]);

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={pageState.data}
        columns={columns}
        rowCount={pageState.total}
        loading={pageState.isLoading}
        pageSizeOptions={[25, 50, 100]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
      />
    </div>
  );
}