import React, { useState } from 'react'
import "./header.css"


const Header = () => {
  const [click, setClick] = useState(false)

  return (
    <>
      <section className='head'>
        <div className='container flexSB'>
          <div className="logo">
            <h2>ODFDS</h2>
            {/* <img src="logoHeader.png" /> */}
          </div>               
        </div>
      </section>
      <header>
       <nav className='flexSB'>
          <ul className= {click ? "mobile-nav" : "flexSB"} onClick={() => setClick(false)}>
           <li><a href="/">Home</a></li>         
           <li><a href="/about">About us</a></li>
           <li><a href="/login/restaurant">Account</a></li>
           <li><a href="/Customer">Customer service</a></li>
         </ul>

       </nav>       
     </header>
    </>
  )
}

export default Header;


