import React from 'react';
import './blackboardHeader.css';
import LogoGraphic from '../../Assets/BoozersWeepersLogo_trans.png'
import QueenGraphic from '../../Assets/OrangeVic.png'


const BlackboardHeader = () => {
    return (
        <div className='BBHeaderContainer'> 
        <div className="BBHeaderMainBar"><a href='/'>
        <img src={LogoGraphic} alt='BoozersWeepers Logo'/></a></div>
        <img src={QueenGraphic} alt="Queen Victoria" className="BBbottom-right-image"/>
        </div>
      );
    };

export default BlackboardHeader;