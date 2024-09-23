import VertNavbar from '../VertNavBar/VertNavBar';
import React, { useState, useEffect} from 'react';
import {useLocation } from 'react-router-dom';
import isTokenValid from '../Utility/isTokenValid';
import BlackboardHeader from '../blackboardHeader/blackboardHeader';
import '../../Pages/style.css'
import QueenGraphic from '../../Assets/OrangeVic.png'


const PageLayout = ({ navigate, children,ShowHeader=true, }) => {
  const [token] = useState(window.localStorage.getItem("token"));
  const [isLoggedIn] = useState(isTokenValid(token));
  const toggleExpand = () => {setExpanded(!expanded);};
  const location = useLocation();
  const expandedState = location.state?.expandedState;
  const [expanded, setExpanded] = useState(expandedState !== undefined ? expandedState : false)

// TODO - Remove from Pagelayout
  // useEffect(() => {
  //   if (isLoggedIn) {navigate('/MyAccount', {state : {expandedState: expanded }});}
  // }, [isLoggedIn, navigate]);

  return(

<div className='shade'>
  <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
    <div className='blackboard'>
      <div className='form'>
      {ShowHeader && <BlackboardHeader/>}
      <img src={QueenGraphic} alt="Queen Victoria" className="BBbottom-right-image"/>
      <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />

      {children}


      </div>
    </div>
  </div>
</div>


)}

export default PageLayout;
