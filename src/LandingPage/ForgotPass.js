import React, {
    useState
} from 'react'
import {
    Routes,
    Route,
    useParams
  } from "react-router-dom"
import TabBar from "./../Components/TabBar"
import RestaurantForgotPass from "./RestaurantForgotPassword.js"
import DriverForgotPass from "./DriverForgotPassword.js"

export default function LoginPage(props){
    const {userType} = useParams()
    return (
        <div>
            <Routes>
                <Route 
                    exact path="/" 
                    element={
                        (()=>{
                            switch(userType){
                                case "restaurant":
                                    return <RestaurantForgotPass/>
                                case "driver":
                                    return <DriverForgotPass/>
                            }
                        })()}
                />
            </Routes>
        </div>
    )
}