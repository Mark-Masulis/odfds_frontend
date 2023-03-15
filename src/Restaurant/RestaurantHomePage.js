import React, {useState} from 'react'
import styled from 'styled-components';
import TabBar from "./../Components/TabBar"
import {
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom"

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  padding: 20px;
  width: 50%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  margin-bottom: 10px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: none;
  width: 100%;
`;

const HalfInput = styled(Input)`
  width: calc(50% - 5px);
`;

const QuarterInput = styled(Input)`
  width: calc(25% - 5px);
`;

const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: none;
  width: 100%;
  height: 100px;
`;

const Button = styled.button`
  margin: 0px auto;
  background-color: #0C695D;
  font-family: Inter;
  color: white;
  font-size: 20px;
  border: 0;
  border-radius: 5px;
  padding: 10px 50px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3e8e41;
  }
`;
function RestaurantHomePage(props) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Name: ${name}\nPhone Number: ${phoneNumber}\nAddress: ${address}\nCity: ${city}\nState: ${state}\nZip Code: ${zipCode}\nComments: ${comments}`);
  };

  return (
    <div>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Column>
            <Row>
              <Label htmlFor="name">Name:</Label>
              <HalfInput type="text" id="name" placeholder="Enter customer name" value={name} onChange={(e) => setName(e.target.value)} />
              <Label htmlFor="phoneNumber">Phone Number:</Label>
              <HalfInput type="text" id="phoneNumber" placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </Row>
            <Row>
              <Label htmlFor="address">Address:</Label>
              <HalfInput type="text" id="address" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
              <Label htmlFor="city">City:</Label>
              <QuarterInput type="text" id="city" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
              <Label htmlFor="state">State:</Label>
              <QuarterInput type="text" id="state" placeholder="Enter state" value={state} onChange={(e) => setState(e.target.value)} />
              <Label htmlFor="zipCode">Zip Code:</Label>
              <QuarterInput type="text" id="zipCode" placeholder="Enter zip code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
            </Row>
            <Row>
              <Label htmlFor="comments">Additional Comments:</Label>
              <TextArea id="comments" placeholder="Enter additional comments" value={comments} onChange={(e) => setComments(e.target.value)} />
            </Row>
            <Button type="submit">Calculate Order</Button>
          </Column>
        </Form>
      </FormContainer>
    </div>
  );
}


export default RestaurantHomePage