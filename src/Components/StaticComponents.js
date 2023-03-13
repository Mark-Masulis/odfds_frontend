import styled from 'styled-components'

/*
These components should be reuseable throughout the project to keep a consistent look.
*/

const Container = styled.div`
background-color: #fffcfc;
margin: 20px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100vh;

@media (min-width: 768px) {
  flex-direction: row;
  justify-content: space-around;
  height: auto;
}
`;
const OverlayContainer = styled.div`
  position: relative;
  width: 300px;
  height: 10px;
  background-color: #C7EBF0;
  margin-top: -20px;
  margin-left: 5px; 
  margin-right: 20px;
  box-shadow:
  2.9px 4.7px 19.1px rgba(0, 0, 0, 0.101),
  9.8px 15.9px 64.1px rgba(0, 0, 0, 0.149),
  44px 71px 287px rgba(0, 0, 0, 0.25)
;
`;

const OverlayImage = styled.img`
  width: 200px;
  height: 50%;
  object-fit: cover;
  margin-left: 100px; 
  margin-top: -200px;
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
  width: 400px;
  height: 50%; 
  text-align: center; 
  
`;

const BoxImage = styled.img` 
  /* Add custom styles based on the className prop */
  &.restaurant {
    /* Styles for the restaurant image */ 
    width: 200px;
    padding: 10px;
    margin-top: 40px;
    z-index: 1;
  }

  &.driver {
    /* Styles for the driver image */   
    width: 400px;
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

const LinkButton = styled.a`
margin-top: 10px;
display: inline-block;
padding: 10px 25px;
background-color: #1eb2a6;
color: #fff;
border-radius: 5px;
text-decoration: none;

&:hover {
  background-color: #0c7a72;
}
`;

export {
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
}
