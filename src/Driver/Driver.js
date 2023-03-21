import React, { useState } from "react";
import { 
  Routes, 
  Route, 
  useNavigate, 
  useParams, 
  useSearchParams 
} from "react-router-dom";
import TabBar from "./../Components/TabBar";
import RestaurantHomePage
 from "./DriverHomePage";
import RestaurantOrders from './DriverHistory'
import RestaurantProfile from './DriverProfile'
import DriverHomePage from "./DriverHomePage";
import DriverProfile from "./DriverProfile";
import DriverHistory from "./DriverHistory";
export default function Driver(props) {
  const { userType } = useParams();
  const [userTab, setUserTab] = useState(userType || "create");
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
              setUserTab("home");
              navigate(`/driver/home?token=${token}`)
            },
          },
          { 
            label: "History",
            onSelect: () => {
              setUserTab("order history");
              navigate(`/driver/history?token=${token}`)
            }, 
          },
          {
            label: "Profile",
            onSelect: () => {
              setUserTab("profile");
              navigate(`/driver/profile?token=${token}`)
            }
          }
        ]}
        defaultLabel={userType}
      />
      <Routes>
        <Route path="/home" element={<DriverHomePage token={token}/>}/>
        <Route path="/profile" element={<DriverProfile token={token}/>}/>
        <Route path="/history" element={<DriverHistory token={token}/>}/>
      </Routes>
    </div>
  );
}

