import React from 'react'
import styled from 'styled-components'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom"

const Container = styled.div`
background-color: #fffcfc;
margin: 20px;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
height: 80vh;

@media (min-width: 768px) {
  flex-direction: row;
  justify-content: space-between;
  height: auto; 
}
`;
const OverlayContainer = styled.div`
  position: relative;
  width: 50%;
  height: 50%; 
  top: -150px;
`;

const OverlayImage = styled.img`
  width: 40%;
  height: 40%;
  object-fit: cover;
  margin-left: 150px;
  opacity: 0.3;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: color: #fff;
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
`;

const BoxContainer = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px; 
  text-align: center; 
`;

const BoxImage = styled.img` 
  /* Add custom styles based on the className prop */
  &.restaurant {
    /* Styles for the restaurant image */ 
    width: 40%;
    padding: 10px;
  }

  &.driver {
    /* Styles for the driver image */   
    width: 50%;
    padding: 10px;
  } 
`; 

const Title = styled.h1`
font-size: 1.8rem;
text-align: center;
max-width: 500px;
color: #093833;
`;

const Text = styled.p`
font-size: 18px;
line-height: 1.5;
color: #1eb2a6;
margin: 10px;
max-width: 350px;
`; 

const Button = styled.a`
margin-top: 10px;
display: inline-block;
padding: 10px 25px;
background-color: #1eb2a6;
color: #fff;
border-radius: 5px;
text-decoration: none;
`;

const Footer = styled.footer`
  text-align: center;
  font-size: 14px;
  margin-top: 2px;
`;

function Box(props) {
  const { className, image, text, title, buttonText } = props;
  return (
    <BoxContainer>
      <BoxImage src={image} alt="Box Image" className={className} />
      <Title>{title}</Title>
      <Text>{text}</Text>     
      <Button href="#">{buttonText}</Button>
    </BoxContainer>
  );
}


function LandingPage(props) {
  return (
    <>
      <Container>
        <OverlayContainer>
          <OverlayImage src="logoRBG.png" alt="Background Image" />
          <Overlay>
            <Box image="logoR.png"  title="Are you a restaurant that needs food delivery service? " text="Click on restaurant to get started." buttonText="Restaurant" className="restaurant">
            </Box>
          </Overlay>
        </OverlayContainer>
      
          <Box image="logoDriver.png" title="Do you want a side gig delivering food to customers?" text="Click on Driver to get started." buttonText="Driver" className="driver" />
      </Container>
      <Footer>
        <p>&copy; 2023 Online Delivery Application. All rights reserved.</p>
      </Footer>
    </>
  );
}  
export default LandingPage;
