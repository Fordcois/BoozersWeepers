import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import isTokenValid from '../components/Utility/isTokenValid';
import VertNavbar from '../components/VertNavBar/VertNavBar';
import SignUpForm from '../components/user/SignUpForm'
import BlackboardHeader from '../components/blackboardHeader/blackboardHeader';
import '../Pages/style.css'

const SignUpPage = ({ navigate}) => {
  const location = useLocation();
  const expandedState = location.state?.expandedState;
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
  const [expanded, setExpanded] = useState(expandedState !== undefined ? expandedState : true);

  const toggleExpand = () => {setExpanded(!expanded);};

  useEffect(() => {
    if (isLoggedIn) {navigate('/myAccount');}
    }, [token, navigate, isLoggedIn]);

    return (

      <div className='shade'>
        <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
          <div className='blackboard'>
            <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
            <BlackboardHeader/>

            <span className="chalk" style={{ '--fsize': '34px' ,'--talign': 'center'}}>Register</span>
              
            <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
              <SignUpForm navigate={navigate} />

              <div style={{ marginTop: '40px' }}>
                <span className="chalk" style={{ '--fsize': '18px', '--talign': 'center' }}>Already have an account?</span>
                <Link to="/login" state={{expandedState : expanded }} className="Homepage-link">Login</Link>
              </div>

            </div>

          </div>
        </div>
      </div>
      
    )};
  
export default SignUpPage;