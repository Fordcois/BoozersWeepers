import VertNavbar from '../VertNavBar/VertNavBar';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import isTokenValid from '../Utility/isTokenValid';
import '../../Pages/style.css'
import LogoGraphic from '../../Assets/BoozersWeepersLogo_trans.png'
import QueenGraphic from '../../Assets/OrangeVic.png'


const Home = ({ navigate }) => {
  const [expanded, setExpanded] = useState(true);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
  const toggleExpand = () => {setExpanded(!expanded);};

  useEffect(() => {
    if (isLoggedIn) {navigate('/MyAccount');}
  }, [isLoggedIn, navigate]);

  return(
<div className='shade'>
  <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
    <div className='blackboard'>
      <div className='form'>
      <img src={QueenGraphic} alt="Queen Victoria" className="BBbottom-right-image"/>
      <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />

      <img src={LogoGraphic} alt='BoozersWeepers Logo' className="HomeLogo"/>
      
      <span className="chalk" style={{ '--fsize': '34px' ,'--talign': 'center'}}>Home of the Pint-Sized bet</span>

      <div style={{ paddingTop: '25px', textAlign: 'center' }}>
        <Link to={{ pathname: '/login', state: { name: 'John' } }} className="Homepage-link">Sign-in</Link>
        <p>
        <span className="chalk" style={{ '--fsize': '18px' ,'--talign': 'center'}}>Don't have an account?</span>
        <Link to={{ pathname: '/newpage', state: { name: 'John' } }} className="Homepage-link">Register</Link></p>
      </div>
 
 
      </div>
    </div>
  </div>
</div>


)}

export default Home;
