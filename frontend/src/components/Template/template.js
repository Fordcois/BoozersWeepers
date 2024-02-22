import React, { useEffect, useState } from 'react';
import VertNavbar from '../VertNavBar/VertNavBar';
import BlackboardHeader from '../blackboardHeader/blackboardHeader';
import '../../Pages/style.css';
import { useLocation } from 'react-router-dom';

const Template = ({ navigate }) => {
  const [token, setUserToken] = useState(window.localStorage.getItem('token'));
  const [expanded, setExpanded] = useState(true);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  const location = useLocation();
  const nameParam = new URLSearchParams(location.search).get('name');
  const name = nameParam || 'John Doe'; // Use 'John Doe' as default if nameParam is falsy

  return (
    <div className='shade'>
      <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
        <div className='blackboard'>
          <div className='form'>
            <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
            <BlackboardHeader /> 
          
            <span className='chalktitle'>Welcome to the Workshop, {name} </span>
            The status is {expanded.toString()}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;