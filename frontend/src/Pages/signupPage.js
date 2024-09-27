import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import isTokenValid from '../components/Utility/isTokenValid';
import SignUpForm from '../components/user/SignUpForm'
import PageLayout from '../components/PageLayout/PageLayout';
import '../Pages/style.css'

const SignUpPage = ({ navigate}) => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(location.state?.expandedState ?? true);
  const [token] = useState(window.localStorage.getItem("token"));
  const [isLoggedIn] = useState(isTokenValid(token));

  useEffect(() => {
    if (isLoggedIn) {navigate("/myAccount", { state: { expandedState: expanded } } );}
    }, [token, navigate, isLoggedIn]);

    return (

<PageLayout expanded={expanded} setExpanded={setExpanded}>

  <span className="chalk" style={{ '--fsize': '34px' ,'--talign': 'center'}}>Register</span>

  <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
    <SignUpForm navigate={navigate} />

    <div style={{ marginTop: '40px' }}>
      <span className="chalk" style={{ '--fsize': '18px', '--talign': 'center' }}>Already have an account?</span>
      <Link to="/login" state={{expandedState : expanded }} className="Homepage-link">Login</Link>
    </div>

  </div>

</PageLayout>
      
    )};
  
export default SignUpPage;