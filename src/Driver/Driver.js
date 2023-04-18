import React, { useState } from "react"
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
  const location = useLocation()
  const pathParts = location.pathname.split('/')
  const [userTab, setUserTab] = useState(userType || "create")
  const [locationActive, setLocationActive] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()
  const token = searchParams.get("token")
  const navigate = useNavigate()

  return (
    <div>
      <TabBar
        tabs={[
          {
            label: "Home",
            onSelect: () => {
              setUserTab("home")
              navigate(`/driver/home?token=${token}`)
            },
          },
          { 
            label: "History",
            onSelect: () => {
              setUserTab("history")
              navigate(`/driver/history?token=${token}`)
            }, 
          },
          {
            label: "Profile",
            onSelect: () => {
              setUserTab("profile")
              navigate(`/driver/profile?token=${token}`)
            }
          }
        ]}
        defaultLabel={pathParts[pathParts.length - 1]}
      />
      <Routes>
        <Route path="/home" element={<DriverHomePage token={token}/>}/>
        <Route path="/profile" element={
          <DriverProfile 
            token={token}
            onActivateStateChange={(state) => {setLocationActive(state)}}
          />
        }/>
        <Route path="/history" element={<DriverHistory token={token}/>}/>
      </Routes>
      <OrderTracker
        token={token}
        active={locationActive}
        frequencySeconds={10}
        onOrderRecieved={(data) => {
          //do something when a new order is received
        }}
        onOrderRejected={(data) => {
          //do something when an order is rejected or timed out
        }}
        onOrderAccepted={(data) => {
          //do something when the driver accepts an order
        }}
      />
      {/*Replace the "open={false}" with some conditional check for when the notification should appear*/}
      <Notification
        onDismiss={() => {
          //do something when the notification is dismissed
        }}
        timeSeconds={5}
        open={false}
        text="Accept the order to see the delivery destination."
        title="A new order near you is available!"
      />
    </div>
  );
}

