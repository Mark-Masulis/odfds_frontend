import React, { useState } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom"
import {
  useNavigate
} from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Header from '../Components/Header.jsx';

export default function Customer(props){
      const [trackingCode, setTrackingCode] = useState('');
      const navigate = useNavigate();
      const handleTrackingCodeChange = (event) => {
          setTrackingCode(event.target.value);
      }
  
      const handleTrackingCodeSubmit = (event) => {
        event.preventDefault();
        // Get the tracking code from the form input
        const trackingCode = event.target.elements.trackingCode.value;

        // Send a request to the backend to process the tracking code
        fetch(`/api/tracking/${trackingCode}`)
          .then((response) => {
            // Check if the response was successful
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }

            return response.json();
          })
           .then((data) => {          
              switch (data.code) {
                case 200:
                  const token = data.token;
                  navigate(`/restaurant/home?token=${token}`);
                  break;
                case 400:
                  navigate(`/error-page`);
                  break;
                default:
                  navigate(`/unknown-error`);
                  break;
              }
            });
} 
  
  return (
    <>
    <Header />
    <div style={{ margin: "0 auto", width: "100%", padding: "85px" }}>
      
      <h1 style={{ marginTop: "40px", marginBottom: "40px" }}>Welcome to the Customer Tracking Page</h1>
      <form onSubmit={handleTrackingCodeSubmit}>
        <div>
          <label style={{ marginBottom: "10px", fontSize: "20px" }}>
          Enter your tracking code:
          </label>
        </div>
        <TextField
          fullWidth
          label="#893142"
          value={trackingCode}
          onChange={handleTrackingCodeChange}
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