import React, { useState } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom"
import Notification from './Notification'
import OrderTracker from './OrderTracker'
import { Button } from '../Components/StaticComponents'

export default function DriverHomePage(props){

  const [active, setActive] = useState(false)

  return(
  <div>
    <Button
      onClick={() => {setActive(!active)}}
    >
      {active ? "Deactivate" : "Activate"}
    </Button>
    <OrderTracker
      frequencySeconds={5}
      token={props.token}
      active={active}
      onOrderReceived={(data) => {
        alert("There is a new order available!")
      }}
      onOrderRejected={(data) => {
        alert("The order timed out or was rejected.")
      }}
      onOrderAccept={(data) => {
        alert("The order was accepted")
      }}
      onOrderPickup={(data) => {
        alert("The order was picked up")
      }}
      onNoLocation={(data) => {
        alert("Unable to access location.")
      }}
      onError={(error) => {
        alert(JSON.stringify(error))
      }}
    />
  </div>)
}