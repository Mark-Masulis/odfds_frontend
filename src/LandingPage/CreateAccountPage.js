import React, {
    useState
} from 'react'
import {
    Routes,
    Route,
    useParams
  } from "react-router-dom"
import TabBar from "../Components/TabBar"
import RestaurantCreateAcct from "./RestaurantCreateAcct"
import DriverCreateAcct from "./DriverCreateAcct"

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
                                    return <RestaurantCreateAcct/>
                                case "driver":
                                    return <DriverCreateAcct/>
                            }
                        })()}
                />
                <Route
                    path="/reset"
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