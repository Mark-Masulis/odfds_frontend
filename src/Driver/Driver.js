import React, { useState, useEffect } from "react"
import { 
  Routes, 
  Route, 
  useNavigate, 
  useParams, 
  useSearchParams,
  useLocation
} from "react-router-dom"
import TabBar from "./../Components/TabBar"
import DriverHomePage from "./DriverHomePage"
import DriverHistory from './DriverHistory'
import DriverProfile from './DriverProfile'
import OrderTracker from "./OrderTracker"
import Notification from "./Notification"

export default function Restaurant(props) {
  const { userType } = useParams()
  const [rawLocation, setRawLocation] = useState(null);
  const [location, setLocation] = useState(null)
  const [locationTimer, setLocationTimer] = useState(null)
  const urlLocation = useLocation();
  const pathParts = urlLocation.pathname.split('/')
  const [locationActive, setLocationActive] = useState(false)
  const [newOrder, setNewOrder] = useState(false)
  const [needsOnboarding, setNeedsOnboarding] = useState(false)
  const [secondOrder, setSecondOrder] = useState(false)
  const [acceptedOrders, setAcceptedOrders] = useState([])
  const [availableOrder, setAvailableOrder] = useState()
  const DeliveryStates = {
    NOORDER: 0,
    AVAILABLE: 1,
    ACCEPTED: 3,
    PICKEDUP: 4,
    DELIVERED: 5, //only used if there are more than 1 order
    FINISHED: 6
  }
  const [deliveryState, setDeliveryState] = useState(DeliveryStates.NOORDER)

  const [searchParams, setSearchParams] = useSearchParams()
  const token = searchParams.get("token")
  const navigate = useNavigate()

  useEffect(() => {
    if (locationActive && rawLocation == null && locationTimer == null) {
      const updateLocation  = () => {
        navigator.geolocation.getCurrentPosition((position) => {
          setRawLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        });
      }
      const myInterval = setInterval(() => updateLocation(), 2000);
      setLocationTimer(myInterval);
      updateLocation();
      return () => clearInterval(myInterval);
    } else {
      if (locationActive == false && locationTimer != null) {
        clearInterval(locationTimer);
        setRawLocation(null);
        setLocationTimer(null);
        setLocation(null);
      }
    }
  }, [locationActive])

  useEffect(() => {
    if (location == null) {
      setLocation(rawLocation);
    } else {
      const latDiff = Math.abs(rawLocation.lat - location.lat);
      const lngDiff = Math.abs(rawLocation.lng - location.lng);
      if (latDiff > 0.0001 || lngDiff > 0.0001) {
        setLocation(rawLocation);
      }
    }
  }, [rawLocation])

  return (
    <div>
      <TabBar
        tabs={[
          {
            label: "Home",
            onSelect: () => {
              navigate(`/driver/home?token=${token}`)
            },
          },
          { 
            label: "History",
            onSelect: () => {
              navigate(`/driver/history?token=${token}`)
            }, 
          },
          {
            label: "Profile",
            onSelect: () => {
              navigate(`/driver/profile?token=${token}`)
            }
          }
        ]}
        defaultLabel={pathParts[pathParts.length - 1]}
      />
      <Routes>
        <Route path="/home" element={
          <DriverHomePage 
            token={token}
            onActivationStateChange={(state) => {setLocationActive(state)}}
            locationActive={locationActive}
            location={location}
            deliveryState={deliveryState}
            availableOrder={availableOrder}
            currentOrder={acceptedOrders}
            onPaymentFailed={() => {
              setDeliveryState(DeliveryStates.NOORDER);
            }}
            onComplete={() => {
              setLocationActive(true);
              setDeliveryState(DeliveryStates.NOORDER);
            }}
          />
        }/>
        <Route path="/profile" element={<DriverProfile token={token}/>
        }/>
        <Route path="/history" element={<DriverHistory token={token}/>}/>
      </Routes>
      <OrderTracker
        token={token}
        active={locationActive}
        frequencySeconds={2}
        onOrderRecieved={(data) => {
          //do something when a new order is received
          setNewOrder(true)
          setDeliveryState(DeliveryStates.AVAILABLE)
          setAvailableOrder(data)
          
        }}
        onOrderRejected={(data) => {
          //do something when an order is rejected or timed out
          setDeliveryState(DeliveryStates.NOORDER)
        }}
        onOrderAccepted={(data) => {
          //do something when the driver accepts an order
          if(Array.isArray(data)){
            setAcceptedOrders(data)
          }else{
            setAcceptedOrders([data])
          }
          setDeliveryState(DeliveryStates.ACCEPTED)
        }}
        onSecondOrder={(data) => {
          //do something when a second order is assigned
          if(acceptedOrders.length <= 2){ //make sure there isn't already a second order
            setAcceptedOrders(acceptedOrders.concat(data))
          }
        }}
        onOrderPickup={(data) => {
          setAcceptedOrders(data)
          setDeliveryState(DeliveryStates.PICKEDUP)
        }}
        onFirstDelivered={(data) => {
          setAcceptedOrders(data)
          setDeliveryState(DeliveryStates.DELIVERED)
        }}
        onDeliver={(data) => {
          setDeliveryState(DeliveryStates.FINISHED)
        }}
        onUnverified={(data) => {
          //do something when the driver doesn't have a verified account and can't take orders yet
          setNeedsOnboarding(true)
          setLocationActive(false)
        }}
      />
      <Notification
        onDismiss={() => {
          //do something when the notification is dismissed
          setNewOrder(false)
        }}
        timeSeconds={5}
        open={newOrder}
        text="Accept the order to see the delivery destination."
        title="A new order near you is available!"
      />
      <Notification
        onDismiss={()=>{
          setNeedsOnboarding(false)
        }}
        timeSeconds={5}
        open={needsOnboarding}
        text='Go to the "Profile" tab and click "Edit Profile" for onboarding. Onboarding must be completed before you can accept orders.'
        title="You must complete onboarding!"
      />
      <Notification
        onDismiss={()=>{
          setSecondOrder(false)
        }}
        timeSeconds={5}
        open={secondOrder}
        text='You have been assigned a second order from the same restaurant.'
        title="A Second Order Has Been Assigned!"
      />
    </div>
  );
}

