import React, {useState } from 'react';
import VertNavbar from '../VertNavBar/VertNavBar';
import BlackboardHeader from '../blackboardHeader/blackboardHeader';

import '../../Pages/style.css';




const Template = ({ navigate }) => {

  const [expanded, setExpanded] = useState(true);
  const [groupName, setGroupName] = useState('');
  const toggleExpand = () => {setExpanded(!expanded);};

  const handlegroupNameChange = (event) => {
    setGroupName(event.target.value)
	}



  return (
    <div className='shade'>
      <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
        <div className='blackboard'>
          <div className='form'>
            <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
            <BlackboardHeader expandedState={expanded}/> 
            
            <span className='chalktitle'>Welcome to the Workshop </span>

      <div style={{color:'whitesmoke'}}>
            <span style={{ textDecoration: groupName.length > 3 ? 'line-through' : 'none' }}>{groupName}</span>
            <input placeholder="Enter your group name..." onChange={handlegroupNameChange} />
</div>



          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;