import React, { useState } from 'react'
import Head from './Head';
import "./header.css"
import { Link } from "react-router-dom"

const Header = () => {
  const [click, setClick] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // set default language to English

  const handleLanguageSelect = (event) => {
    setSelectedLanguage(event.target.value);
    // handle language selection logic here (e.g. update language state in parent component)
  };

  return (
    <>
      <Head />
      <header>
       <nav className='flexSB'>
          <ul className= {click ? "mobile-nav" : "flexSB"} onClick={() => setClick(false)}>
           <li><a href="/">Home</a></li>         
           <li><a href="/">About us</a></li>
           <li><a href="/">Account</a></li>
           <li><a href="/">Customer service</a></li>
         </ul>

         <select value={selectedLanguage} onChange={handleLanguageSelect}>
          <option value="en">EN</option>
          <option value="es">Español</option>
          <option value="zh">中文</option>
        </select>
       </nav>
     </header>
    </>
  )
}

export default Header;


