import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom"


export default function App() {

  //Every time you want to add a new page path (baseurl.com/my_path) do it here
  //If you want to make a subpage/subcomponent, (baseurl.com/my_path/subpath), add another router in whatever component /my_path routes to

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<p>Landing Page Component Goes Here!</p>}/>
        <Route path="/some_other_path" element={<p>Some other page's component goes here</p>}/>
      </Route>
    )
  );

  //If some components will be present throughout the site, like a navigation bar, then this RouterProvider can be passed as a prop or surrounded by the component.
  return (
    <RouterProvider router={router} />
  );
}
