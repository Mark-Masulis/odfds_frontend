import React, {
    useState
} from 'react'
import {
    Routes,
    Route,
    useParams
  } from "react-router-dom"
import TabBar from "./../Components/TabBar"
import RestaurantLogin from "./RestaurantLogin"
import DriverLogin from "./DriverLogin"

export default function LoginPage(props){
    const {userType} = useParams()
    const [userTab, setUserTab] = useState(userType || "restaurant")
    return (
        <div>
            <TabBar 
                tabs={[
                    {label: "Restaurant", onSelect: ()=>{setUserTab("restaurant")}},
                    {label: "Driver", onSelect: ()=>{setUserTab("driver")}}
                ]}
                defaultLabel={userType}
            />
            <Routes>
                <Route 
                    exact path="/" 
                    element={
                        (()=>{
                            switch(userTab){
                                case "restaurant":
                                    return <RestaurantLogin/>
                                case "driver":
                                    return <DriverLogin/>
                            }
                        })()}
                />
                <Route
                    exact path="/reset"
                    element={
                        (()=>{
                            switch(userTab){
                                case "restaurant":
                                    return <p>Restaurant password reset component goes here</p>
                                case "driver":
                                    return <p>Driver password reset component goes here</p>
                            }
                        })()    
                    }
                />
            </Routes>
        </div>
    )
}