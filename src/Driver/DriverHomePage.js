import React, { useState, useEffect  } from 'react'
import { 
  Routes, 
  Route, 
  useNavigate, 
  useParams, 
  useSearchParams,
  useLocation 
} from "react-router-dom"
import TabBar from "./../Components/TabBar"
import DriverHistory from './DriverHistory'
import DriverProfile from './DriverProfile'
import OrderTracker from "./OrderTracker"


export default function DriverHomePage(props){
  const { userType } = useParams()
  const location = useLocation()
  const pathParts = location.pathname.split('/')
  const [userTab, setUserTab] = useState(userType || "create")
  const [searchParams, setSearchParams] = useSearchParams()
  const token = props.token
  const navigate = useNavigate()
  const [status, setStatus] = useState('')
  const [isActivated, setIsActivated] = useState(false);
   
  const handleToggle = () => {
    setIsActivated(!isActivated)
  }

  return (
    <div>
      <div>
        <Routes>
          <Route
            path="/home"
            element={
            <>
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
                    label: "Account",
                    onSelect: () => {
                      setUserTab("account")
                      navigate(`/driver/profile?token=${token}`)
                    }
                  }
                ]}
                defaultLabel={pathParts[pathParts.length - 1]}
              />
            </>
          }
        />
          <Route path="/account" element={<DriverProfile token={token}/>}/>
          <Route path="/history" element={<DriverHistory token={token}/>}/>
        </Routes>
      </div>

      <div className="status" style={{ 
        marginTop: '80px',
        marginBottom: '280px',
        marginLeft: '200px',
        marginRight: '180px',
        display: 'flex', 
        alignItems: 'space-around',
         }}>
        <input
          type="text"
          placeholder="Current Status:"
          value={status}
          readOnly   
          style={{ 
            border: 'none', 
            width: '500px',       
            fontSize: '30px'}}
        />
        <button onClick={handleToggle} 
                style={{border: 0,
                        borderRadius: '5px', 
                        padding: '10px 50px',
                        backgroundColor: '#0C695D',
                        color: 'white',
                        fontSize: '26px' }}>
          {isActivated ? 'Deactivate' : 'Activate'}
        </button>
      </div>

      <OrderTracker
        token={token}
        active={isActivated}
        frequencySeconds={5}
        onOrderReceived={(data) => console.log('Order received:', data)}
        onOrderRejected={(data) => console.log('Order rejected:', data)}
        onOrderAccepted={(data) => console.log('Order accepted:', data)}
        onOrderPickup={(data) => console.log('Order pickup:', data)}
        onNoLocation={() => console.log('Unable to access location.')}
        onError={(error) => console.log('Error:', error)}
        onUnverified={(data) => console.log('Unverified account:', data)}
      />
    </div>
  );
}