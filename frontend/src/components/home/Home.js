import VertNavbar from '../VertNavBar/VertNavBar';
import React, { useState } from 'react';
import '../../Pages/style.css'
import '../header/Header.js'

const Home = ({ navigate }) => {
  const [expanded, setExpanded] = useState(true);
  const toggleExpand = () => {setExpanded(!expanded);};

  return(
    <div className='logged-out-page-container'>
    <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
  <a className='register-link' href='/signup'>Please Register</a><br/>
  or <br/>
  <a className='login-link'href='/login'>Sign in</a>
    
  </div>
  )
}

export default Home;
