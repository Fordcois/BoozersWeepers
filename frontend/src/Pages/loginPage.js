import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import PageLayout from '../components/PageLayout/PageLayout';
import isTokenValid from '../components/Utility/isTokenValid';
import LogInForm from '../components/auth/LoginForm';

import '../Pages/style.css'

const LogInPage = ({ navigate }) => {
  const [token] = useState(window.localStorage.getItem("token"));
  const [isLoggedIn] = useState(isTokenValid(token));
  const location = useLocation();
  const [expanded, setExpanded] = useState(location.state?.expandedState ?? true);



  useEffect(() => {
    if (isLoggedIn) {navigate("/myAccount", { state: { expandedState: expanded } } );}
    }, [token,navigate]);

  return (
<PageLayout expanded={expanded} setExpanded={setExpanded}>
  <span className="chalk" style={{ '--fsize': '34px' ,'--talign': 'center'}}>Log in</span>
  <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
  <LogInForm navigate={navigate} expanded={expanded}/>
  <div style={{ marginTop: '40px' }}>
    <span className="chalk" style={{ '--fsize': '18px', '--talign': 'center' }}>Don't have an account?</span>
    <Link to='/signup' state = {{expandedState: expanded }} className="Homepage-link"> Register</Link>
  </div>
  </div>
</PageLayout>
)};
  
export default LogInPage;











  




    
  

 



