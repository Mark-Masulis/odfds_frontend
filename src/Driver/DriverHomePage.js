import React, { useState } from 'react'
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

  const handleActivate = () => {
      
    // Send a request to the server to activate location tracking
    fetch(process.env.REACT_APP_API + '/api/activateLocation', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to activate location tracking')
      }
      // Update the driver's status and set isActivated to true
      setStatus('Active')
      setIsActivated(true);
    })
    .catch(error => {
      console.error(error)
      setStatus('Failed to activate location tracking')
    })
  };

  const handleDeactivate = () => {
    // Send a request to the server to deactivate location tracking
    fetch('/api/deactivateLocation', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to deactivate location tracking')
      }
      // Update the driver's status and set isActivated to false
      setStatus('Inactive')
      setIsActivated(false);
    })
    .catch(error => {
      console.error(error)
      setStatus('Failed to deactivate location tracking')
    })
  };

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
          onChange={(e) => setStatus(e.target.value)}   
          style={{ 
            border: 'none', 
            width: '500px',       
            fontSize: '30px'}}
        />
         {isActivated ?
              <button onClick={handleDeactivate} style={{ fontSize: '26px' }}>Deactivate</button> :
              <button onClick={handleActivate} style={{ fontSize: '26px' }}>Activate</button>
            }
      </div>
    </div>
  );
}