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
  const [locationActive, setLocationActive] = useState(false)
  const [newOrder, setNewOrder] = useState(false)
  const [needsOnboarding, setNeedsOnboarding] = useState(false)

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
          />
        }/>
        <Route path="/profile" element={<DriverProfile token={token}/>
        }/>
        <Route path="/history" element={<DriverHistory token={token}/>}/>
      </Routes>
      <OrderTracker
        token={token}
        active={locationActive}
        frequencySeconds={10}
        onOrderRecieved={(data) => {
          //do something when a new order is received
          setNewOrder(true)
        }}
        onOrderRejected={(data) => {
          //do something when an order is rejected or timed out
        }}
        onOrderAccepted={(data) => {
          //do something when the driver accepts an order
        }}
        onUnverified={(data) => {
          //do something when the driver doesn't have a verified account and can't take orders yet
          setNeedsOnboarding(true)
        }}
      />
      {/*Replace the "open={false}" with some conditional check for when the notification should appear*/}
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
        text='Go to the "Profile" tab and click "Edit Profile" for onboarding.'
        title="You must complete onboarding!"
      />
    </div>
  );
}

