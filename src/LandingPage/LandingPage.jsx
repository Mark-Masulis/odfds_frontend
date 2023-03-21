import React from 'react';
import "./LandingPage.css"
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function LandingPage(props) {
  
  return (
    <div className="landingpage">
      <h1>Food Delivery Made Simple</h1>     
      <div className="container">
        <div className="box">
          <img src="https://venturaharbor.com/wp-content/uploads/2022/08/Ota-take-out-2-full-file-2048x1364.jpg" alt="ri" />   
          <p>Are you a restaurant that needs food delivery service? </p>
          <Link to="/login/restaurant">
            <Button variant="containe">Restaurant Entry</Button>
          </Link>    
        </div>
        <div className="box">
          <img src="https://www.brookings.edu/wp-content/uploads/2022/05/Cover-photo-2-e1652220627267.jpeg" />
          <p>Do you want a side gig delivering food to customers?"</p>
          <Link to="/login/driver">
            <Button variant="containe">Driver Entry</Button>
          </Link>
          
        </div>
      </div>
      </div>
  );
}

export default LandingPage;
