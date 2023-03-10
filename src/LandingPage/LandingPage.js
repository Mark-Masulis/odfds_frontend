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
    width: 50%;
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

const Footer = styled.footer`
  text-align: center;
  margin-top: 2rem;
`;

function LandingPage(props) {
  return (
    <>
      <Container>
        <Box image="logoRestaurant.png"  title="Are you a restaurant that needs food delivery service? " text="Click on restaurant to get started." buttonText="Restaurant" className="restaurant"/>
        <Box image="logoDriver.png" title="Do you want a side gig delivering food to customers?" text="Click on Driver to get started." buttonText="Driver" className="driver" />
      </Container>
      <Footer>
        <p>&copy; 2023 Online Delivery Application. All rights reserved.</p>
      </Footer>
    </>
  );
}  
export default LandingPage;
