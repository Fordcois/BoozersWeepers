import VertNavbar from '../VertNavBar/VertNavBar';
import React, { useState, useEffect } from 'react';
import isTokenValid from '../Utility/isTokenValid';
import BlackboardHeader from '../blackboardHeader/blackboardHeader';
import '../../Pages/style.css'


const Home = ({ navigate }) => {
  const [expanded, setExpanded] = useState(true);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
  const toggleExpand = () => {setExpanded(!expanded);};

  useEffect(() => {
    if (isLoggedIn) {navigate('/MyAccount');}
  }, [isLoggedIn, navigate]);

  return(
<div className='shade'>
<div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
<div className='blackboard'>
<div className='form'>
  <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
  <BlackboardHeader />
          
    <span className='chalktitle'>WELCOME TO BOOZERS WEEPERS</span>
</div>
</div>
</div>
</div>


)}

export default Home;
