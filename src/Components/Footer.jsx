import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className='footer'>
      <div className='contact'>
        <a href='/contact'>Contact Us</a>
      </div>
      <div className='social'>
        <a href='https://facebook.com'><i className='fab fa-facebook-f'></i></a>
        <a href='https://twitter.com'><i className='fab fa-twitter'></i></a>
        <a href='https://instagram.com'><i className='fab fa-instagram'></i></a>
      </div>
      <div className='copy'>
        <p>&copy; 2023 Online Delivery Application. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;

