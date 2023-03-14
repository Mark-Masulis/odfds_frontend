import React from 'react'
import {
  Route,
  Routes,
  useSearchParams
} from "react-router-dom"
import RestaurantHomePage from './RestaurantHomePage'
import RestaurantProfile from './RestaurantProfile'

export default function Customer(props){
  const [searchParams, setSearchParams] = useSearchParams()
  const token = searchParams.get("token")

  return(
      <div>
        <Routes>
          <Route path="/home" element={<RestaurantHomePage token={token}/>}/>
          <Route path="/profile" element={<RestaurantProfile token={token}/>}/>
        </Routes>
      </div>
  )
}