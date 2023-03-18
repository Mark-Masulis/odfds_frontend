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
export default function Restaurant(props) {
  const { userType } = useParams()
  const location = useLocation()
  const pathParts = location.pathname.split('/')
  const [userTab, setUserTab] = useState(userType || "create")
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
        <Route path="/profile" element={<DriverProfile token={token}/>}/>
        <Route path="/history" element={<DriverHistory token={token}/>}/>
      </Routes>
    </div>
  );
}

