import React, { useEffect, useState } from 'react';
import VertNavbar from '../VertNavBar/VertNavBar';
import BlackboardHeader from '../blackboardHeader/blackboardHeader';
import '../../Pages/style.css';
import { useLocation } from 'react-router-dom';

const Template = ({ navigate }) => {
  const [token, setUserToken] = useState(window.localStorage.getItem('token'));

  // Get expanded from URL params, defaulting to true
  const location = useLocation();
  const expandedParam = new URLSearchParams(location.search).get('expanded');
  const [expanded, setExpanded] = useState(expandedParam ? expandedParam === 'true' : true);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className='shade'>
      <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
        <div className='blackboard'>
          <div className='form'>
            <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
            <BlackboardHeader /> 
          
            <span className='chalktitle'>Welcome to the Workshop</span>

            <p style={{color:'white'}}>

                <a href='/workshop?expanded=true'>Expanded View</a><br/>
                <a href='/workshop?expanded=false'>Collapsed View</a><br/>
                <a href={`/workshop?expanded=${expanded.toString()}`}>Carry On View</a><br/>
            
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;