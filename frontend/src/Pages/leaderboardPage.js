import React, { useEffect, useState } from 'react';
import isTokenValid from '../components/Utility/isTokenValid';
import PageLayout from '../components/PageLayout/PageLayout';
import Leaderboard from '../components/leaderboard/leaderboard';
import '../Pages/style.css'
import { useLocation } from 'react-router-dom';


const LeaderBoardPage = ({ navigate }) => {
  const [token] = useState(window.localStorage.getItem("token"));
  const [isLoggedIn] = useState(isTokenValid(token));
  const location = useLocation();
  const [expanded, setExpanded] = useState(location.state?.expandedState ?? true);




  useEffect(() => {
    if (!isLoggedIn) { navigate('/', { state: { expandedState: expanded } }); }
  }, [navigate, isLoggedIn]);

  return (
    <PageLayout expanded={expanded} setExpanded={setExpanded}>
          <Leaderboard />
    </PageLayout>

  );
};

export default LeaderBoardPage;
