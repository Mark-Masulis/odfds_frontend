import React from 'react'
import {
  Container,
  OverlayContainer,
  OverlayImage,
  Overlay,
  Content,
  BoxContainer,
  BoxImage,
  Title,
  Text,
  LinkButton
} from './../Components/StaticComponents'

function Box(props) {
  const { className, image, text, title, buttonText, link } = props;
  return (
    <BoxContainer>
      <BoxImage src={image} alt="Box Image" className={className} />
      <Title>{title}</Title>
      <Text>{text}</Text>     
      {className === 'restaurant' && (
        <RestaurantButton href={link.restaurantLink}>Restaurant</RestaurantButton>
      )}
      {className === 'driver' && (
        <DriverButton href={link.driverLink}>Driver</DriverButton>
      )}
      </BoxContainer>
  );
}

const RestaurantButton = ({ href, children }) => (
  <LinkButton href={href} className="Button" >
    {children}
  </LinkButton>
);

const DriverButton = ({ href, children }) => (
  <LinkButton href={href} className="Button" >
    {children}
  </LinkButton>
);

function LandingPage(props) {
  const links = {
    restaurantLink: '/login/restaurant',
    driverLink: '/login/driver',
  };
  return (
    <>
      <Container>
        <OverlayContainer>
          <OverlayImage src="logoRBG.png" alt="Background Image" />
          <Overlay>
          <Box
              image="logoR.png"
              title="Are you a restaurant that needs food delivery service? "
              text="Click on restaurant to get started."
             /*  buttonText="Restaurant" */
              className="restaurant"
              link={links}
            />
          </Overlay>
        </OverlayContainer>
      
        <Box
          image="logoDriver.png"
          title="Do you want a side gig delivering food to customers?"
          text="Click on Driver to get started."
          /* buttonText="Driver" */
          className="driver"
          link={links}
        />
      </Container>
    </>
  );
}  
export default LandingPage;
