import React, { useState} from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { restaurantOrderSchema } from "../Utils/validation";
import "./../Components/ButtonStyle.css"
import Checkout from "../Components/Payment/Checkout";
import { useNavigate } from "react-router-dom";

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

const ValidationError = styled.p`
  font-size: 12px;
  color: red;
`;


export default function RestaurantHomePage(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const [defaultSetup, setDefaultSetup] = useState(true)
  const [error, setError] = useState(false)
  
  const [cost, setCost] = useState(0)
  const [pickupAddr, setPickUp] = useState("")
  const [deliveryAddr, setDelivery] = useState("")
  const [time, setTime] = useState(0)
  const [payment, setPayment] = useState("")
  const [distance, setDistance] = useState(0)

  // form validation
  const [validationResult, setValidationResult] = useState({});

  const [orderId, setOrderId] = useState()

  const navigate = useNavigate()

  const getProfileData = () => {
    const token = props.token
    if (!token){
        //setError(true)
        return
    }
    setLoading(true)
    fetch(process.env.REACT_APP_API + '/restaurant/profile', {
        method: "GET",
        headers: {
            "content-type": "application/json",
            access_token: token
        }
    }).then(
        (response) => response.json()
    ).then(
        (data) => {
            switch(data.code){
                case 200: 
                    setPickUp(`${data.data.street}, ${data.data.city}, ${data.data.state} ${data.data.zipCode}`)
                    
                    //need to look into whether payment can be retrieved from DB, is a static value for now
                    setPayment("Discover ending in *1234")
                    break;
                default: //bad things are happening :(
                    //setError(true)
                    break
            }
            setLoading(false) 
        }
        
    )
    
  }

  const estimateOrder = () =>{
    const token = props.token
    if (!token){
        //setError(true)
        return
    } 
    setLoading(true)
    fetch(process.env.REACT_APP_API + '/restaurant/order/estimate', {
      method: "POST",
      headers: {
        "content-type": "application/json",
        access_token: token
      },
      body: JSON.stringify({
        "street": address,
        "city": city,
        "state": state,
        "zipCode": zipCode
      })
    }).then(
      (response) => response.json()
    ).then(
      (data) => {
          switch(data.code){
              case 200: //good things are happening :)
                  const distanceMiles = (data.data.estimatedDistanceInMeters / 1609)
                  var cost = 5;
                  if(distanceMiles > 1){
                    cost = (distanceMiles - 1) * 2 + 5;
                  }
                  setTime(Math.round(data.data.estimatedDurationInSeconds/60))
                  setCost(Math.round(cost * 100) / 100)
                  setDistance(Math.round(distanceMiles * 100) / 100)
                  break
              default: //bad things are happening :(
                  setError(true)
                  alert(data.message)
                  break
          }
          setLoading(false)
      }
    )
  }

  const createOrder = () => {
    fetch(process.env.REACT_APP_API + '/restaurant/order', {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        access_token: props.token
      },
      body: JSON.stringify({
        customerStreet: deliveryAddr,
        customerCity: city,
        customerState: state,
        customerZipCode: zipCode,
        customerEmail: email,
        customerPhone: phoneNumber,
        customerName: name,
        comment: comments
      })
    }).then(
      (response) => response.json()
    ).then(
      (data) => {
        switch(data.code){
          case 200:
            setOrderId(data.data.orderId)
            break
          default:
            setError(true)
            alert(data.data.message)
            break
        }
      }
    ).catch(
      (error) => {
        alert(error)
      }
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    restaurantOrderSchema.validate({
      name: name,
      phoneNumber: phoneNumber,
      address:address,
      city: city,
      state: state,
      zip: zipCode,
      comments: comments
    }, {
      abortEarly: false, 
    }) .then(valid => {
      console.log({ valid });

      setDelivery(`${address}, ${city}, ${state} ${zipCode}`)
      getProfileData()
      estimateOrder()
      if(!error){
        setDefaultSetup(false)
      }
    })
    .catch(result => {
      const errObject = result.inner.reduce(
        (obj, err) => {
          if (!obj[err.path]) {
            obj[err.path] = [];
          }
          obj[err.path].push(err.message);
          return obj;
        },
        {}
      );
      setValidationResult(errObject);
    });
  };

  const placeOrder = (event) => {
    alert("Order Placed")
  }

  const printErrors = (key) => <>{
    validationResult[key] && validationResult[key]
      .map((err) => <ValidationError className="error">{err}</ValidationError>)
  }</>;

  return (
    <div>
      {defaultSetup && 
      <div>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Column>
            <Row>
            <Pad>
            <h2>Start A New Order</h2>
            </Pad>
            </Row>
            <Row>
              <Pad>
                <TextField
                  id="name"
                  label="Customer Name"
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
                  label="Customer Phone Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={phoneNumber}
                  disabled={loading}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Pad>
              <Pad>
                <TextField
                  id="email"
                  label="Customer Email Address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={email}
                  disabled={loading}
                  onChange={(e) => setEmail(e.target.value)}
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
              {printErrors('address')}
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
              {printErrors('city')}
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
              {printErrors('state')}
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
              {printErrors('zip')}
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
              {printErrors('comments')}
            </Row>
            <div class="styledBtnContainer">
              <Button variant="contained" size="medium" type="submit">Calculate Order</Button>
            </div>
          </Column>
        </Form>
      </FormContainer>
      </div>
      }
      {!defaultSetup && 
      <div style={{width: "80%", margin: "0 auto"}}>
          <h2>Order Overview</h2>
          <ul>
              <li>Customer Name: {name}</li>
              <li>Pickup Address: {pickupAddr}</li>
              <li>Delivery Address: {deliveryAddr}</li>
              <li>Distance: {distance} miles</li>
              <li>Estimate Travel Time: {time} min</li>
              <li>Cost: ${cost}</li>
              <li>Payment: {payment}</li>
          </ul>
      <div class="styledBtnContainer">
        <Button 
          variant="contained" 
          size="medium" 
          onClick ={(e) => {
            setDefaultSetup(true)
            setOrderId(null)
          }}
        >
          Change Order
        </Button>
      </div>
      <div>
          Map Placeholder
      </div>
      {orderId && 
        <Checkout
          token={props.token}
          orderId={orderId}
          onConfirm={() => {
            navigate('/restaurant/history?token=' + props.token)
          }}
        />
      }
      {orderId != null || <div class="styledBtnContainer">
        <Button variant="contained" size="medium" onClick ={createOrder}>Place Order</Button>
      </div>}
  </div>}
  </div>
    
  );
}
