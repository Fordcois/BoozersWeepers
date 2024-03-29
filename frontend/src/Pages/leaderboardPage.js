import React, { useEffect, useState } from 'react';
import isTokenValid from '../components/Utility/isTokenValid';
import VertNavbar from '../components/VertNavBar/VertNavBar';
import BlackboardHeader from '../components/blackboardHeader/blackboardHeader';
import Leaderboard from '../components/leaderboard/leaderboard';
import '../Pages/style.css'
import { useLocation } from 'react-router-dom';


const LeaderBoardPage = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [wagers, setWagers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
  const location = useLocation();
  const expandedState = location.state?.expandedState;
  const [expanded, setExpanded] = useState(expandedState !== undefined ? expandedState : true);

  const toggleExpand = () => { setExpanded(!expanded); };

  useEffect(() => {
    if (!isLoggedIn) { navigate('/', { state: { expandedState: expanded } }); }
  }, [navigate, isLoggedIn]);

  return (
    <div className='shade'>
      <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
        <div className='blackboard'>
          <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
          <BlackboardHeader expandedState={expanded}/>
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardPage;
