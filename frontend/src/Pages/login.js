import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import isTokenValid from '../components/Utility/isTokenValid';
import VertNavbar from '../components/VertNavBar/VertNavBar';
import LogInForm from '../components/auth/LoginForm';
import BlackboardHeader from '../components/blackboardHeader/blackboardHeader';
import '../Pages/style.css'

const LogInPage = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
  const location = useLocation();
  const expandedState = location.state?.expandedState;
  const [expanded, setExpanded] = useState(expandedState !== undefined ? expandedState : true);

  const toggleExpand = () => {setExpanded(!expanded);};

  useEffect(() => {

    if (isLoggedIn) {navigate('/myAccount');}
    }, [token,navigate]);

  return (
    <div className='shade'>
      <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
        <div className='blackboard'>
          <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
          <BlackboardHeader/>

          <span className="chalk" style={{ '--fsize': '34px' ,'--talign': 'center'}}>Log in</span>
            
          <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
            <LogInForm navigate={navigate} />
            
            <div style={{ marginTop: '40px' }}>
              <span className="chalk" style={{ '--fsize': '18px', '--talign': 'center' }}>Don't have an account?</span>
              <Link to='/signup' state = {{expandedState: expanded }} className="Homepage-link"> Register</Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  )};
  
export default LogInPage;











  




    
  

 



