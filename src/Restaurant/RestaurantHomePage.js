import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import {
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

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
const Pad = styled.div`
  width: 100%;
  padding: 5px;
`;

function RestaurantHomePage(props) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      `Name: ${name}\nPhone Number: ${phoneNumber}\nAddress: ${address}\nCity: ${city}\nState: ${state}\nZip Code: ${zipCode}\nComments: ${comments}`
    );
  };

  return (
    <div>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Column>
            <Row>
              <Pad>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                disabled={loading}
                onChange={(name) => {
                  setName(name.target.value);
                }}
              />
              </Pad>
              <Pad>
              <TextField
                id="phoneNum"
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={phoneNumber}
                disabled={loading}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              </Pad>
            </Row>
            
            <Row>
            <Pad>
              <TextField
                id="address"
                label="Address"
                variant="outlined"
                fullWidth
                margin="normal"
                value={address}
                disabled={loading}
                onChange={(e) => setAddress(e.target.value)}
              />
              </Pad>
              <Pad>
              <TextField
                id="city"
                label="City"
                variant="outlined"
                fullWidth
                margin="normal"
                value={city}
                disabled={loading}
                onChange={(e) => setCity(e.target.value)}
              />
              </Pad>
              <Pad>
              <TextField
                id="state"
                label="State"
                variant="outlined"
                fullWidth
                margin="normal"
                value={state}
                disabled={loading}
                onChange={(e) => setState(e.target.value)}
              />
              </Pad>
              <Pad>
              <TextField
                id="zipCode"
                label="Zip Code"
                variant="outlined"
                fullWidth
                margin="normal"
                value={zipCode}
                disabled={loading}
                onChange={(e) => setZipCode(e.target.value)}
              />
              </Pad>
            </Row>
            <Row>
              <TextField
                id="comments"
                label="Comments"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={comments}
                disabled={loading}
                onChange={(e) => setComments(e.target.value)}
              />
            </Row>
            <Button type="submit">Calculate Order</Button>
          </Column>
        </Form>
      </FormContainer>
    </div>
  );
}

export default RestaurantHomePage;
