import VertNavbar from '../VertNavBar/VertNavBar';
import React from 'react';
import BlackboardHeader from '../blackboardHeader/blackboardHeader';
import '../../Pages/style.css'
import QueenGraphic from '../../Assets/OrangeVic.png'


const PageLayout = ({ children,expanded,setExpanded,ShowHeader=true }) => {

const toggleExpand = () => {setExpanded(!expanded);};
  




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
