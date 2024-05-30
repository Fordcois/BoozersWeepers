import VertNavbar from '../VertNavBar/VertNavBar';
import React, { useState, useEffect} from 'react';
import { Link,useLocation } from 'react-router-dom';
import isTokenValid from '../Utility/isTokenValid';
import '../../Pages/style.css'
import LogoGraphic from '../../Assets/BoozersWeepersLogo_trans.png'
import QueenGraphic from '../../Assets/OrangeVic.png'
import ApiWakeup from '../Utility/API_WakeUp';
import HereFromPort from '../Utility/HereFromPort';


const Home = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
  const toggleExpand = () => {setExpanded(!expanded);};
  const location = useLocation();
  const expandedState = location.state?.expandedState;
  const [expanded, setExpanded] = useState(expandedState !== undefined ? expandedState : true)


  useEffect(() => {
    if (isLoggedIn) {navigate('/MyAccount', {state : {expandedState: expanded }});}
  }, [isLoggedIn, navigate]);

  return(
<div className='shade'>
  <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
    <div className='blackboard'>
      <div className='form'>
      <img src={QueenGraphic} alt="Queen Victoria" className="BBbottom-right-image"/>
      <ApiWakeup /> 
      <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />

      <img src={LogoGraphic} alt='BoozersWeepers Logo' className="HomeLogo"/>
      
      
      
      <span className="chalk" style={{ '--fsize': '34px' ,'--talign': 'center'}}>Home of the Pint-Sized bet</span>

      <div style={{ paddingTop: '25px', textAlign: 'center' }}>
        <Link to='/login' state={{expandedState: expanded}} className="Homepage-link"> Sign-in</Link>
        <p>
        <span className="chalk" style={{ '--fsize': '18px' ,'--talign': 'center'}}>Don't have an account?</span>
        <Link to='/signup' state={{expandedState: expanded}} className="Homepage-link">Register</Link></p>
      </div>

      <HereFromPort/>

 
      </div>
    </div>
  </div>
</div>


)}

export default Home;
