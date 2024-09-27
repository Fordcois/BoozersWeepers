
import React, { useState, useEffect} from 'react';
import { Link,useLocation } from 'react-router-dom';
import isTokenValid from '../Utility/isTokenValid';
import '../../Pages/style.css'
import LogoGraphic from '../../Assets/BoozersWeepersLogo_trans.png'
import PageLayout from '../PageLayout/PageLayout';
import ApiWakeup from '../Utility/API_WakeUp';
import HereFromPort from '../Utility/HereFromPort';


const Home = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));

  const location = useLocation();
  const [expanded, setExpanded] = useState(location.state?.expandedState ?? true);


  useEffect(() => {
    if (isLoggedIn) {navigate('/MyAccount', {state : {expandedState: expanded }});}
  }, [isLoggedIn, navigate]);

  return(

    <PageLayout expanded={expanded} setExpanded={setExpanded} ShowHeader={false}>
      
      <ApiWakeup /> 
      <img src={LogoGraphic} alt='BoozersWeepers Logo' className="HomeLogo"/>

      <span className="chalk" style={{ '--fsize': '34px' ,'--talign': 'center'}}>Home of the Pint-Sized bet</span>

      <div style={{ paddingTop: '25px', textAlign: 'center' }}>
        <Link to='/login' state={{expandedState: expanded}} className="Homepage-link"> Sign-in</Link>
        <p>
        <span className="chalk" style={{ '--fsize': '18px' ,'--talign': 'center'}}>Don't have an account?</span>
        <Link to='/signup' state={{expandedState: expanded}} className="Homepage-link">Register</Link></p>
      </div>

      <HereFromPort/>



</PageLayout>
)}

export default Home;
