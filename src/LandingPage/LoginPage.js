import React, {
    useState
} from 'react'
import {
    Routes,
    Route
  } from "react-router-dom"
import TabBar from "./../Components/TabBar"
import RestaurantLogin from "./RestaurantLogin"

export default function LoginPage(props){
    const [userType, setUserType] = useState("restaurant")

    return (
        <div>
            <TabBar 
                tabs={[
                    {label: "Restaurant", onSelect: ()=>{setUserType("restaurant")}},
                    {label: "Driver", onSelect: ()=>{setUserType("driver")}}
                ]}
            />
            <Routes>
                <Route 
                    exact path="/" 
                    element={
                        (()=>{
                            switch(userType){
                                case "restaurant":
                                    return <RestaurantLogin/>
                                case "driver":
                                    return <p>Driver login component goes here</p>
                            }
                        })()}
                />
                <Route
                    path="/reset"
                    element={
                        (()=>{
                            switch(userType){
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