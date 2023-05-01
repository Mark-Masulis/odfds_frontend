import React, { useState, useEffect } from 'react'
import { Button } from '../Components/StaticComponents'
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';

//props.onActivationStateChange = funciton called when activate state is toggled. Gives the NEW state as a param
//props.locationActive = current state of the location tracking feature
//props.acceptedOrders = list of accepted orders OR the single accepted order
//props.deliveryState = the state of the delivery. Determines which components should render
//props.availableOrder = the available order to be accepted or rejected
//props.currentOrder = the current order being delivered (during pickup it doesn't matter which it is if there are 2)
//props.onComplete = function called when the user clicks "continue" on the Finished page

export default function DriverHomePage(props) {

  
  const location = useLocation();
  const { data } = location.state;
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [distance, setDistance] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [restaurantLocation, setRestaurantLocation] = useState(null);
  const [restaurantLatLng, setRestaurantLatLng] = useState(null);
  const [destinationLatLng, setDestinationLatLng] = useState(null);
  const [directions, setDirections] = useState(null);
  const [directionsStatus, setDirectionsStatus] = useState(null);
  const mapRef = useRef(null);
  const map = mapRef.current;
  // get customer location, driver location, and destination location 
  const getLocationData = () => {
    if (data) {
      console.log('data:', data);  
      console.log('driver location:', { lat: data.data.driver.latitude, lng: data.data.driver.longitude });   
      console.log('destination location:', data.data.customerStreet + ' ' + data.data.customerCity + ' ' + data.data.customerState + ' ' + data.data.customerZipCode);
      console.log('restaurant location:', data.data.restaurant.street + ' ' + data.data.restaurant.city + ' ' + data.data.restaurant.state + ' ' + data.data.restaurant.zipCode);
      setDriverLocation({ lat: data.data.driver.latitude, lng: data.data.driver.longitude });
      setDestinationLocation(data.data.customerStreet + ' ' + data.data.customerCity + ' ' + data.data.customerState + ' ' + data.data.customerZipCode);
      setRestaurantLocation(data.data.restaurant.street + ' ' + data.data.restaurant.city + ' ' + data.data.restaurant.state + ' ' + data.data.restaurant.zipCode);                     
      }
  };


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
                />
              )
            case DeliveryStates.AVAILABLE:
              return(
                <AcceptRejectButton
                  token={props.token}
                  order={props.availableOrder}
                />
              )
            case DeliveryStates.ACCEPTED:
              return(
                <MapToRestaurant
                  token={props.token}
                  order={props.currentOrder}
                  onPickup={() => {}}
                />
              )
            case DeliveryStates.PICKEDUP:
            case DeliveryStates.DELIVERED:
              return(
                <MapToCustomer
                  token={props.token}
                  order={props.currentOrder}
                />
              )
            case DeliveryStates.FINISHED:
              return(
                <Finished
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
  const token = props.token
  const [isActivated, setIsActivated] = useState(props.locationActive)

  const handleToggle = () => {
    setIsActivated(!isActivated)
    props.onActivationStateChange(!isActivated)
  }

  return(
    <div
      className="status"
      style={{
        marginTop: '80px',
        marginBottom: '280px',
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
  )
}

//props.order = the order object being considered
function AcceptRejectButton(props){

  const [loading, setLoading] = useState(false)

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

  //TODO: show more order details before the driver accepts
  return(
    <div>
      <h1>A new order is available!</h1>
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
        switch(data){
          case 200:
            alert("Order has been picked up.")
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
      <Button
      disabled={loading}
      style={{marginLeft: '0', color: loading? 'gray':null}}
        onClick={pickupOrder}
      >
        Pick Up Order
      </Button>
      <div>
        <p>{JSON.stringify(props.order.restaurant)}</p>
        <p>Placeholder for map to restaurant</p>
      </div>
    </div>
  )
}

//props.order
//props.token
function MapToCustomer(props){
  const [loading, setLoading] = useState(false)

  const deliverOrder = () => {
    setLoading(true)
    fetch(process.env.REACT_APP_API + '/driver/order/deliver?orderId=' + props.order.id, {
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
      <Button
      disabled={loading}
      style={{marginLeft: '0', color: loading? 'gray':null}}
        onClick={deliverOrder}
      >
        Deliver Order
      </Button>
      <div>
        <p>{props.order.customerStreet}</p>
        <p>Placeholder for map to customer</p>
      </div>
    </div>
    </div>
  )
}

//props.onComplete = function called when driver clicks complete button
function Finished(props){
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
