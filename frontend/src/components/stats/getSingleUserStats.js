import React, { useEffect, useState } from 'react';
import '../leaderboard/leaderstats.css'

const SingleUserStats = ({ UserID }) => {
  const [token, setUserToken] = useState(window.localStorage.getItem('token'));
  const [results, setResults] = useState({
    BetsMade: 0,
    BetsComplete: 0,
    Wins: 0,
    Losses: 0,
    WinPercentage: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/wagers/findall/${UserID}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const fetchedData = await response.json();
        const usersWagers = fetchedData.wagers;

        let updatedResults = {
          BetsMade: 0,
          BetsComplete: 0,
          Wins: 0,
          Losses: 0,
        };

        console.log(usersWagers);

        usersWagers.forEach((pint) => {
          if (pint.approved===true) updatedResults.BetsMade++;
          if (pint.winner !== null) updatedResults.BetsComplete++;
          if (pint.winner !== null && pint.winner._id === UserID) updatedResults.Wins++;
          if (pint.winner !== null && pint.winner !== UserID) updatedResults.Losses++;
        });

        setResults(updatedResults);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [UserID, token]);

  return (
  <div style={{ width:'100%', display:'block' }}>

    <span className="penfont-small">Bets Made:</span> 
    <span className="penfont-large">{results.BetsMade}</span>

    <span className="penfont-small">Wins:</span> 
    <span className="penfont-large centered">{results.Wins}</span>

    <span className="penfont-small">Losses:</span> 
    <span className="penfont-large centered">{results.Losses}</span>

    <span className="penfont-small">Win Percentage:</span>
    <span className="penfont-large">{results.BetsComplete === 0 ? 0 : (results.Wins / results.BetsComplete * 100).toFixed(2)}%</span>

  </div>
)};

export default SingleUserStats;
