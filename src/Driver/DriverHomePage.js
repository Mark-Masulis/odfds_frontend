import React, { useState, useEffect } from 'react'
import { Button } from '../Components/StaticComponents'
import GoogleMaps from '../Components/map';

//props.onActivationStateChange = funciton called when activate state is toggled. Gives the NEW state as a param
//props.locationActive = current state of the location tracking feature
//props.acceptedOrders = list of accepted orders OR the single accepted order
//props.deliveryState = the state of the delivery. Determines which components should render
//props.availableOrder = the available order to be accepted or rejected
//props.currentOrder = the current order being delivered (during pickup it doesn't matter which it is if there are 2)
//props.onComplete = function called when the user clicks "continue" on the Finished page
export default function DriverHomePage(props) {
  
  const DeliveryStates = {
    NOORDER: 0,
    AVAILABLE: 1,
    ACCEPTED: 3,
    PICKEDUP: 4,
    DELIVERED: 5, //only used if there are more than 1 order
    FINISHED: 6
  }

  return (
    <div>
      {
        (() => {
          switch(props.deliveryState){
            case DeliveryStates.NOORDER:
              return(
                <ActivationButton
                  token={props.token}
                  onActivationStateChange={props.onActivationStateChange}
                  locationActive={props.locationActive}
                  location={props.location}
                />
              )
            case DeliveryStates.AVAILABLE:
              return(
                <AcceptRejectButton
                  token={props.token}
                  order={props.availableOrder}
                  location={props.location}
                />
              )
            case DeliveryStates.ACCEPTED:
              return(
                <MapToRestaurant
                  token={props.token}
                  order={props.currentOrder}
                  onPickup={() => {}}
                  location={props.location}
                />
              )
            case DeliveryStates.PICKEDUP:
            case DeliveryStates.DELIVERED:
              return(
                <MapToCustomer
                  token={props.token}
                  order={props.currentOrder}
                  location={props.location}
                />
              )
            case DeliveryStates.FINISHED:

              return(
                <Finished
                  onActivationStateChange={props.onActivationStateChange}
                  onComplete={props.onComplete}
                />
              )
          }
        })()
      }
    </div>
  )
}

function ActivationButton(props){
  const [isActivated, setIsActivated] = useState(props.locationActive)
  const [location, setLocation] = useState(props.location);

  const handleToggle = () => {
    setIsActivated(!isActivated)
    props.onActivationStateChange(!isActivated)
  }

  useEffect(() => {
    setLocation(props.location)
  }, [props.location]);

  return(
    <div>
      <div
        className="status"
        style={{
          marginTop: '80px',
          marginBottom: '100px',
          marginLeft: '200px',
          marginRight: '180px',
          display: 'flex',
          alignItems: 'space-around'
        }}
      >
        <input
          type="text"
          placeholder="Current Status:"
          value={`Current Status: ${isActivated ? 'Active' : 'Inactive'}`}
          readOnly
          style={{ marginRight: '10px', border: 0, fontSize: '20px', }}
        />

        <Button 
            onClick={handleToggle}
        >
            {isActivated ? 'Deactivate' : 'Activate'}
        </Button>
      </div>
      {
        isActivated && location && <div style={{
            marginLeft: '200px',
            marginRight: '180px',
            display: 'flex',
            flexDirection: "column",
            alignItems: "center"
          }}>
          <div>
            Your current location: lat: {location.lat}, longitude: {location.lng}
          </div>
          <GoogleMaps
            containerStyle={{width: "400px", height: "400px"}}
            destinationLocation={location}
            destinationLabel='Your Location'
          />
        </div>
      }
    </div>
  )
}

//props.order = the order object being considered
function AcceptRejectButton(props){

  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    setLocation(props.location);
  }, [props.location])

  const acceptOrder = () => {
    setLoading(true)
    fetch(process.env.REACT_APP_API + '/driver/order/accept?orderId=' + props.order.id, {
      method: 'GET',
      headers: {
        access_token: props.token
      }
    }).then(
      (response) => response.json()
    ).then(
      (data) => {
        switch(data.code){
          case 200:
            break
          default:
            alert("Something went wrong. Please try again.")
            setLoading(false)
            break
        }
      }
    ).catch(
      (error) => {
        alert("There was an error. Please try again.")
        setLoading(false)
      }
    )
  }

  const rejectOrder = () => {
    setLoading(true)
    fetch(process.env.REACT_APP_API + '/driver/order/reject?orderId=' + props.order.id, {
      method: 'GET',
      headers: {
        access_token: props.token
      }
    }).then(
      (response) => response.json()
    ).then(
      (data) => {
        switch(data.code){
          case 200:
            alert("order rejected")
            break
          default:
            alert("Something went wrong. Please try again.")
            setLoading(false)
            break
        }
      }
    ).catch(
      (error) => {
        alert("There was an error. Please try again.")
        setLoading(false)
      }
    )
  }

  return(
    <div>
      <h1>A new order is available!</h1>
      <p>Order #{props.order.id}</p>
      <p>Restaurant Name: {props.order.restaurant.name}</p>
      <p>Restaurant Phone: {props.order.restaurant.phone}</p>
      {location && <GoogleMaps
        containerStyle={{display: "flex", width: "100%", height: "400px"}}
        destinationLocation={props.order.customerStreet + ", " + props.order.customerStreet + ", " + props.order.customerCity + " " + props.order.customerZipCode}
        originLocation={props.order.restaurant.street + ", " + props.order.restaurant.city + ", " + props.order.restaurant.state + " " + props.order.restaurant.zipCode}
        driverLocation={location}
        toWhere='Restaurant'
      />}
      <Button
        style={{margin: '10px'}}
        onClick={acceptOrder}
        disabled={loading}
      >
        Accept
      </Button>
      <Button
        style={{margin: '10px'}}
        onClick={rejectOrder}
        disabled={loading}
      >
        Reject
      </Button>
    </div>
  )
}

//props.token
function MapToRestaurant(props){
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState(null);

  useEffect(() => {
    setLocation(props.location);
  }, [props.location])

  const pickupOrder = () => {
    setLoading(true)
    fetch(process.env.REACT_APP_API + '/driver/order/pickup', {
      method: 'GET',
      headers: {
        access_token: props.token
      }
    }).then(
      (response) => response.json()
    ).then(
      (data) => {
        setLoading(false)
        switch(data.code){
          case 200:
            alert("Order has been picked up.")
            break;
          case 402:
            alert(data.data);
          default:
            break;
        }
      }
    ).catch(
      (error) => {
        alert("There was an error. Please try again.")
      }
    )
  }

  return(
    <div>
      {props.order.length == 1 ?
      // only one order
      <div>
        <p>Order #{props.order[0].id}</p>
        <p>Customer Name: {props.order[0].customerName}</p>
        <p>Customer Phone: {props.order[0].customerPhone}</p>
        <p>Customer Email: {props.order[0].customerEmail}</p>
        <p>Restaurant Name: {props.order[0].restaurant.name}</p>
        <p>Restaurant Phone: {props.order[0].restaurant.phone}</p>
        <p>Restaurant Email: {props.order[0].restaurant.email}</p>
        <p>Comment: {props.order[0].comment}</p>
        {location && <GoogleMaps
          containerStyle={{display: "flex", width: "100%", height: "400px"}}
          destinationLocation={props.order[0].restaurant.street + ", " + props.order[0].restaurant.city + ", " + props.order[0].restaurant.state + " " + props.order[0].restaurant.zipCode}
          originLocation={location}
          originLabel='Driver'
          destinationLabel='Restaurant'
        />}
      </div> : 
      // two orders
      <div>
      <p>Order #{props.order[0].id}</p>
      <p>Customer1 Name: {props.order[0].customerName}</p>
      <p>Customer1 Phone: {props.order[0].customerPhone}</p>
      <p>Customer1 Email: {props.order[0].customerEmail}</p>
      <p>Comment1: {props.order[0].comment}</p>
      <p>Order #{props.order[1].id}</p>
      <p>Customer2 Name: {props.order[1].customerName}</p>
      <p>Customer2 Phone: {props.order[1].customerPhone}</p>
      <p>Customer2 Email: {props.order[1].customerEmail}</p>
      <p>Comment2: {props.order[1].comment}</p>
      <p>Restaurant Name: {props.order[0].restaurant.name}</p>
      <p>Restaurant Phone: {props.order[0].restaurant.phone}</p>
      <p>Restaurant Email: {props.order[0].restaurant.email}</p>
      {location && <GoogleMaps
        containerStyle={{display: "flex", width: "100%", height: "400px"}}
        destinationLocation={props.order[0].restaurant.street + ", " + props.order[0].restaurant.city + ", " + props.order[0].restaurant.state + " " + props.order[0].restaurant.zipCode}
        originLocation={location}
        originLabel='Driver'
        destinationLabel='Restaurant'
      />}
    </div>
      }
      <Button
      disabled={loading}
      style={{marginLeft: '0', color: loading? 'gray':null}}
        onClick={pickupOrder}
      >
        Pick Up Order
      </Button>
    </div>
  )
}

//props.order
//props.token
function MapToCustomer(props){
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    setLocation(props.location);
  }, [props.location])

  const deliverOrder = () => {
    setLoading(true)
    fetch(process.env.REACT_APP_API + '/driver/order/deliver?orderId=' + props.order[0].id, {
      headers: {
        access_token: props.token
      }
    }).then(
      (response) => response.json()
    ).then(
      (data) => {
        setLoading(false)
        switch(data.code){
          case 200:
            alert("Order has been delivered.")
            break
          case 402:
            alert(data.data)
            break
          default:
            break
        }
      }
    ).catch(
      (error) => {
        alert("There was an error. Please try again.")
      }
    )
  }

  return(
    <div>
      <div>
        <p>Order #{props.order[0].id}</p>
        <p>Customer Name: {props.order[0].customerName}</p>
        <p>Customer Phone: {props.order[0].customerPhone}</p>
        <p>Customer Email: {props.order[0].customerEmail}</p>
        <p>Comment: {props.order[0].comment}</p>
        { location && <GoogleMaps
          containerStyle={{display: "flex", width: "100%", height: "400px"}}
          destinationLocation={props.order[0].customerStreet + ", " + props.order[0].customerCity + ", " + props.order[0].customerState + " " + props.order[0].customerZipCode}
          originLocation={location}
          originLabel='Driver'
          destinationLabel='Customer'
        />}
      <Button
      disabled={loading}
      style={{marginLeft: '0', color: loading? 'gray':null}}
        onClick={deliverOrder}
      >
        Deliver Order
      </Button>
    </div>
    </div>
  )
}

//props.onComplete = function called when driver clicks complete button
function Finished(props){

  // need to deactivate location reporting on this page
  useEffect(() => {
    props.onActivationStateChange(false);
  }, [])

    return(
      <div
        style={{
          marginTop: '80px',
          marginBottom: '280px',
          marginLeft: '200px',
          marginRight: '200px',
          display: 'flex',
          alignItems: 'space-around'
        }}
      >
        <div>
          <h1>Order Complete!</h1>
          <Button
            onClick={props.onComplete}
          >
            Continue
          </Button>
        </div>
      </div>
    )
}