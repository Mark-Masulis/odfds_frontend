import React, { useState } from 'react'
import {
  useNavigate, 
} from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Customer(){
      const [token, setToken] = useState('');
      const navigate = useNavigate();

      const handletokenChange = (event) => {
          setToken(event.target.value);
      }

      const handletokenSubmit = (event) => {
        event.preventDefault(); 
        fetch(`${process.env.REACT_APP_API}/customer/order?token=${token}`, {
        method: 'GET',
        headers: {          
          'Content-Type': 'application/json'         
        }
        })
        .then(response => {
          return response.json();
        })
        .then(data => {
          if(data.code != 200){
            if (data.data.message) {
              alert(data.data.message);
            } else {
              alert(data.data);
            }
          } else {
            navigate('/CustomerHomePage',{state: { data, token }});
          }
        })
        .catch(error => {         
          console.error('Error fetching data:', error);
        });              
    };
  
  return (
    <>   
    <div style={{ margin: "0 auto", width: "100%", padding: "85px" }}>
      
      <h1 style={{ marginTop: "40px", marginBottom: "40px" }}>Welcome to the Customer Tracking Page</h1>
      <form onSubmit={handletokenSubmit}>
        <div>
          <label style={{ marginBottom: "10px", fontSize: "20px" }}>
          Enter your tracking code:
          </label>
        </div>
        <TextField
          fullWidth
          label="#893142"
          value={token}
          onChange={handletokenChange}
        />
        <Button sx={{
          marginTop: '30px',
          backgroundColor: '#0C695D',
          fontFamily: 'Inter',
          color: 'white',
          fontSize: '20px',
          border: 0,
          borderRadius: '5px',
          padding: '10px 50px',
          '&:hover': {
            backgroundColor: '#37AFA9',
            cursor: 'pointer',
          },
        }} type="submit">Submit</Button>
      </form>
    </div>
    </>
  );
  
  }