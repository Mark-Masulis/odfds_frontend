import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom"
import Restaurant from './Restaurant/Restaurant'
import Customer from './Customer/Customer'
import Driver from './Driver/Driver'
import LandingPage from './LandingPage/LandingPage.jsx'
import LoginPage from './LandingPage/LoginPage'
import CreateAcctPage from "./LandingPage/CreateAccountPage"
import Header from './Components/Header'
import Footer from './Components/Footer'
import Layout from './Components/Layout'
import CssBaseline from '@mui/material/CssBaseline';


export default function App() {
  //Every time you want to add a new page path (baseurl.com/my_path) do it here
  //If you want to make a subpage/subcomponent, (baseurl.com/my_path/subpath), add another router in whatever component /my_path routes to
  /* const HeaderWithRouter = withRouter(Header);
  const currentLocation = window.location.pathname; */
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/restaurant/*" element={<Restaurant/>}/>
        <Route path="/customer/*" element={<Customer/>}/>
        <Route path="/driver/*" element={<Driver/>}/>
        <Route path="/login/:userType/*" element={<LoginPage/>}/>
        <Route path="/signup/:userType/*" element={<CreateAcctPage/>}/>
      </Route>
      
    )
  );

  //If some components will be present throughout the site, like a navigation bar, then this RouterProvider can be passed as a prop or surrounded by the component.
  return (    
    
    <div>
      <CssBaseline />
      <Header/>      
      <Layout>
        <RouterProvider router={router} />
      </Layout>
      <Footer />
    </div>
    
    
  )
}
 

