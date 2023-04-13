
import React, {
  useState,
  useEffect
} from 'react'
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";


export default function DriverHistory(props) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [data, setData] = useState()
  const [rows, setRows] =useState([]);
  
  const getOrdersData = () => {
    const token = props.token
    if (!token){
        setError(true)
        return
    }
    fetch(process.env.REACT_APP_API + '/driver/orders?pageSize=10&page=1', {
        method: "GET",
        headers: {
            "content-type": "application/json",
            access_token: token,
        }
    }).then(
        (response) => response.json()
    ).then(
        (data) => {
            setLoading(false)
            
            setData(data.data)
            setRows(data.data.data)
            switch(data.code){
                case 200: //good things are happening :)
                    break;
                default: //bad things are happening :(
                    setError(true)
                    break
            }
        }
    )
  }
  const columns = rows.length > 0 ? Object.keys(rows[0]).map((key) => {
    if (key === "Id") {
      return {
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        width: 200,
        renderCell: (params) => (
          <button onClick={() => handleClick(params.value)}>Click me</button>
        )
      };
    } else {
      return {
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        width: 200,
      };
    }
  }) : [];

  const handleClick = (value) => {
    console.log("Hello world");
  };

  useEffect(getOrdersData, [])
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          height: 600,
          width: "90%",
          display: "inline-block",
        }}
      >
        <DataGrid
          rows={rows}
          columns= {columns}
        />
      </div>
    </div>
  );
}