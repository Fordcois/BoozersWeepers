import React from 'react';
import './blackboardHeader.css';
import LogoGraphic from '../../Assets/BoozersWeepersLogo_trans.png'
import QueenGraphic from '../../Assets/OrangeVic.png'
import { Link } from 'react-router-dom';


const BlackboardHeader = ({expandedState}) => {
    return (
        <div className='BBHeaderContainer'> 
        <div className="BBHeaderMainBar">
          <Link to ={`/`} state = {{expandedState: expandedState }}>
        <img src={LogoGraphic} alt='BoozersWeepers Logo'/></Link></div>
        <img src={QueenGraphic} alt="Queen Victoria" className="BBbottom-right-image"/>
        </div>
      );
    };

export default BlackboardHeader;