import React, { useState } from "react";
import { 
  Routes, 
  Route, 
  useNavigate, 
  useParams, 
  useSearchParams,
  useLocation 
} from "react-router-dom";
import TabBar from "./../Components/TabBar";
import RestaurantHomePage from "./RestaurantHomePage";
import RestaurantOrders from './RestaurantOrders'
import RestaurantProfile from './RestaurantProfile'
export default function Restaurant(props) {
  const { userType } = useParams();
  const location = useLocation()
  const pathParts = location.pathname.split('/');
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
              navigate(`/restaurant/home?token=${token}`)
            },
          },
          { 
            label: "History",
            onSelect: () => {
              setUserTab("history");
              navigate(`/restaurant/history?token=${token}`)
            }, 
          },
          {
            label: "Profile",
            onSelect: () => {
              setUserTab("profile");
              navigate(`/restaurant/profile?token=${token}`)
            }
          }
        ]}
        defaultLabel={pathParts[pathParts.length - 1]}
      />
      <Routes>
        <Route path="/home" element={<RestaurantHomePage token={token}/>}/>
        <Route path="/profile" element={<RestaurantProfile token={token}/>}/>
        <Route path="/history" element={<RestaurantOrders token={token}/>}/>
      </Routes>
    </div>
  );
}

