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
import LandingPage from './LandingPage/LandingPage'


export default function App() {

  //Every time you want to add a new page path (baseurl.com/my_path) do it here
  //If you want to make a subpage/subcomponent, (baseurl.com/my_path/subpath), add another router in whatever component /my_path routes to

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/restaurant" element={<Restaurant/>}/>
        <Route path="/customer" element={<Customer/>}/>
        <Route path="/driver" element={<Driver/>}/>
      </Route>
    )
  );

  //If some components will be present throughout the site, like a navigation bar, then this RouterProvider can be passed as a prop or surrounded by the component.
  return (
    <RouterProvider router={router} />
  );
}
