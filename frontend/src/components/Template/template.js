import React, {useState } from 'react';
import VertNavbar from '../VertNavBar/VertNavBar';
import BlackboardHeader from '../blackboardHeader/blackboardHeader';

import '../../Pages/style.css';




const Template = ({ navigate }) => {

  const [expanded, setExpanded] = useState(true);
  const toggleExpand = () => {setExpanded(!expanded);};

  return (
    <div className='shade'>
      <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
        <div className='blackboard'>
          <div className='form'>
            <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
            <BlackboardHeader expandedState={expanded}/> 
            
            <span className='chalktitle'>Welcome to the Workshop </span>

            Content Here

          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;