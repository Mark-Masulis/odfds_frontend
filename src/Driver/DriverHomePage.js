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
  const token = searchParams.get("token")
  const navigate = useNavigate()
  const [status, setStatus] = useState('')

  const handleButtonClick = () => {
    // Handle button click logic here
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
        <button 
          onClick={handleButtonClick}
          style={{             
            fontSize: '26px',
           
        }}
        >Activate</button>
      </div>
    </div>
  );
}

