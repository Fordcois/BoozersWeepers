import VertNavbar from '../VertNavBar/VertNavBar';
import React, { useState} from 'react';
import {useLocation } from 'react-router-dom';
import BlackboardHeader from '../blackboardHeader/blackboardHeader';
import '../../Pages/style.css'
import QueenGraphic from '../../Assets/OrangeVic.png'


const PageLayout = ({ children,ShowHeader=true }) => {
  

  const toggleExpand = () => {setExpanded(!expanded);};
  const location = useLocation();
  const expandedState = location.state?.expandedState;
  const [expanded, setExpanded] = useState(expandedState !== undefined ? expandedState : false)



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
