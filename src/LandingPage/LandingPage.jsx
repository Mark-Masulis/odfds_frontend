
import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import './../Components/ButtonStyle.css'

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const WelcomeContainer = styled(Container)({
  display: 'flex',
  alignItems: 'flex-start',
  textAlign: 'left',
  padding: (theme) => theme.spacing(10),
  backgroundImage: 'url("https://www.brookings.edu/wp-content/uploads/2022/05/Cover-photo-2-e1652220627267.jpeg")',
  backgroundSize: 'cover',
  backgroundPosition: '350px center' ,
  opacity: '0.8',
  height: '300px', 
  maxWidth: "100%",
  /* background: '#E0F2F2';
  background: 'linear-gradient(90deg, rgba(156,217,228,1) 0%, rgba(195,246,247,1) 35%, rgba(214,238,244,1) 100%)';
 */
});


const ContentContainer = styled(Container)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  backgroundColor: '#ffffff',
  maxWidth: "100%" ,
});

const ResponsiveBox = styled(Box)({
  padding: '30px',
  textAlign: 'center',
  height: '300px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: '#ffffff',
  paddingBottom: '20px',
});

function LandingPage() {
  return (
    <Root className="root">
      <WelcomeContainer  className="welcomeContainer">
        <Typography variant="h2" style={{ fontFamily: 'Inter',  textAlign: 'left', marginLeft: '-100px', padding: '180px', letterSpacing:'2px', color: 'white', textShadow: '0 0 5px rgba(0,0,0,0.5), 0 0 10px rgba(0,0,0,0.5), 0 0 15px rgba(0,0,0,0.5)',}} >
          Welcome to ODFDS!
        </Typography>
      </WelcomeContainer>
      <ContentContainer className="contentContainer">
        <Grid container direction="row" spacing={5}  marginTop="30px" >
          <Grid item xs={12} sm={6} md={4}>
            <ResponsiveBox className="responsiveBox" >
              <img src="R1.png" alt="image" style={{ width: '40%', height: 'auto'}} />
              <Link to="/login/restaurant">
              <div class="styledBtnContainer">
                <Button variant="contained" color="primary" >Restaurant</Button>
              </div>
              </Link>
              <Typography variant="h5" style={{ fontFamily: 'Inter', marginTop: '16px'}}>Are you a restaurant that needs food delivery service?</Typography>              
            </ResponsiveBox>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ResponsiveBox className="responsiveBox">
              <img src="D1.png" alt="image" style={{ width: '40%', height: 'auto'}} />
              <Link to="/login/driver">
              <div class="styledBtnContainer">
              <Button variant="contained" color="primary">Driver</Button>
              </div>
              </Link>
              <Typography variant="h5" style={{ fontFamily: 'Inter', marginTop: '16px'}}>Do you want a side gig delivering food to customers?</Typography>           
            </ResponsiveBox>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ResponsiveBox className="responsiveBox">
              <img src="C1.png" alt="image" style={{ width: '40%', height: 'auto'}} />
              <Link to="/Customer">
              <div class="styledBtnContainer">
                <Button variant="contained" color="primary">Customer</Button>
              </div>
              </Link>
              <Typography variant="h5" style={{ fontFamily: 'Inter', marginTop: '16px'}}>Food Order Customers </Typography>              
            </ResponsiveBox>
          </Grid>
        </Grid>
      </ContentContainer>
    </Root>
  );
}

export default LandingPage;
