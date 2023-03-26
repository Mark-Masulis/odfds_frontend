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
import RestaurantForgotPassword from "./RestaurantForgotPassword"
import DriverForgotPassword from './DriverForgotPassword'
import Header from '../Components/Header.jsx';

export default function LoginPage(props){
    const {userType} = useParams()
    const [userTab, setUserTab] = useState(userType || "restaurant")
    return (
        <div>
            <Header />
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
                                    return <RestaurantForgotPassword/>
                                case "driver":
                                    return <DriverForgotPassword/>
                            }
                        })()    
                    }
                />
            </Routes>
        </div>
    )
}