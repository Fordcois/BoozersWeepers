import React, { useEffect, useState } from 'react';
import isTokenValid from '../components/Utility/isTokenValid';
import getSessionUserID from '../components/Utility/getSignedInUser_id';
import PageLayout from '../components/PageLayout/PageLayout';
import '../Pages/style.css'

import WalletComponent from '../components/walletComponent/WalletComponent';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const WalletPage = ({ navigate }) => {
  const [token, setUserToken] = useState(window.localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
  const [SessionUserId,setSessionUserId] = useState(getSessionUserID(token))
  const location = useLocation();
  const [expanded, setExpanded] = useState(location.state?.expandedState ?? true);




  

  return (
<PageLayout expanded={expanded} setExpanded={setExpanded}>

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
</PageLayout>
  );
};

export default WalletPage;
