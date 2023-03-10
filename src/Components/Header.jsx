import React, { useState } from 'react'
import Head from './Head';
import "./header.css"
import { Link } from "react-router-dom"

const Header = () => {
  const [click, setClick] = useState(false)
  return (
    <>
      <Head />
      <header>
       <nav className='flexSB'>
          <ul className= {click ? "mobile-nav" : "flexSB"} onClick={() => setClick(false)}>
           <li><a href="/m">Home</a></li>         
           <li><a href="/">About us</a></li>
           <li><a href="/">Contact us</a></li>
         </ul>
       </nav>
     </header>
    </>
  )
}

export default Header;


