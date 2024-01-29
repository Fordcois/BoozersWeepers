import React, { useEffect, useState } from 'react';
import isTokenValid from '../Utility/isTokenValid';
import VertNavbar from '../VertNavBar/VertNavBar';
import BlackboardHeader from '../blackboardHeader/blackboardHeader';
import Leaderboard from '../stats/leaderboard';
import '../../Pages/style.css';



const LeaderBoard = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [wagers, setWagers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => { setExpanded(!expanded); };

  useEffect(() => {
    if (!isLoggedIn) { navigate('/'); }
  }, [navigate, isLoggedIn]);

  return (
    <div className='shade'>
      <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
        <div className='blackboard'>
          <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
          <BlackboardHeader />
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
