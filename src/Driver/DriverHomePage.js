import React, { useState } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom"
import Notification from './Notification'
import OrderTracker from './OrderTracker'

export default function DriverHomePage(props){
  return(<OrderTracker
    frequencySeconds={10}
    token={props.token}
    active={true}
    onOrderReceived={() => {
      alert("RECEIVED")
    }}
    onOrerRejected={() => {
      alert("REJECTED")
    }}
    onNoLocation={() => {
      alert("NO LOCATION")
    }}
  />)
}