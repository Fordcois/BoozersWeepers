import VertNavbar from '../VertNavBar/VertNavBar';
import React, { useState, useEffect} from 'react';
import {useLocation } from 'react-router-dom';
import isTokenValid from '../Utility/isTokenValid';
import '../../Pages/style.css'

import QueenGraphic from '../../Assets/OrangeVic.png'


const ContentFrame = ({ navigate,children }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
  const toggleExpand = () => {setExpanded(!expanded);};
  const location = useLocation();
  const expandedState = location.state?.expandedState;
  const [expanded, setExpanded] = useState(expandedState !== undefined ? expandedState : false)


  useEffect(() => {
    if (isLoggedIn) {navigate('/MyAccount', {state : {expandedState: expanded }});}
  }, [isLoggedIn, navigate]);

  return(
<div className='shade'>
  <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
    <div className='blackboard'>
      <div className='form'>
      <img src={QueenGraphic} alt="Queen Victoria" className="BBbottom-right-image"/>

      <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />

      {children}

 
      </div>
    </div>
  </div>
</div>


)}

export default ContentFrame;
