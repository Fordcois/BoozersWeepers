import React, { useEffect, useState } from 'react';
import isTokenValid from '../components/Utility/isTokenValid';
import getSessionUserID from '../components/Utility/getSignedInUser_id';
import VertNavbar from '../components/VertNavBar/VertNavBar';
import '../Pages/style.css'
import BlackboardHeader from '../components/blackboardHeader/blackboardHeader';
import WalletComponent from '../components/walletComponent/WalletComponent';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const WalletPage = ({ navigate }) => {
  const [token, setUserToken] = useState(window.localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
  const [SessionUserId,setSessionUserId] = useState(getSessionUserID(token))
  const location = useLocation();
  const expandedState = location.state?.expandedState;
  const [expanded, setExpanded] = useState(expandedState !== undefined ? expandedState : true);


  const toggleExpand = () => {setExpanded(!expanded);};

  

  return (
<div className='shade'>
      <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
        <div className='blackboard'>
            <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
            <BlackboardHeader expandedState={expanded}/> 



       {isLoggedIn ? (
          <div>
            {/* Content for logged-in users */}
            <div className='chalktitle'>Wallet</div>
            <WalletComponent UserID={SessionUserId} expandedState= {expanded}/>
          </div>
        
        
        
        
        ) : (
          <div>
            {/* Content for non-logged-in users */}
            <p>Please <Link to ="/login" state = {{expandedState: expanded}}>log in</Link> to access this page</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
