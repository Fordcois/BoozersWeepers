import React, { useState, useEffect } from 'react';
import calculateUserStats from '../stats/calculateuserstats';
import './leaderstats.css'

const Leaderboard = () => {
  const [userToken, setUserToken] = useState(window.localStorage.getItem("token"));
  const [pintsData, setpintsData] = useState([]);
  const [userObject, setuserObject] = useState([]);
  const [userWithMostLosses, setUserWithMostLosses] = useState(null);
  const [userWithMostWins, setUserWithMostWins] = useState(null);

  useEffect(() => {
    const fetchPints = async () => {
      try {
        const response = await fetch(`/pints`, {
        headers: { Authorization: `Bearer ${userToken}` }
        });
        if (!response.ok) {throw new Error('Network response was not ok');}
        const fetchedData = await response.json();
        setpintsData(fetchedData.pints);
      } catch (error) {console.error('Error fetching pint data:', error);}
    };

    fetchPints(); 
  }, [userToken]); 

  useEffect(() => {
    const userObjectArray = calculateUserStats(pintsData)
      .sort((a, b) => b.winPercentage - a.winPercentage)
      .slice(0, 10)
    setuserObject(userObjectArray);

    // Find user with the most pintsOwedNotClaimed
    const userWithMostLosses = userObjectArray.reduce((prev, current) =>
      prev.betsLost > current.betsLost ? prev : current, {});

    setUserWithMostLosses(userWithMostLosses);

    // Find user with the highest pintsOwnedClaimed
    const userWithMostWins = userObjectArray.reduce((prev, current) =>
      prev.betsWon > current.betsWon ? prev : current, {});

    setUserWithMostWins(userWithMostWins);

  }, [pintsData]);

  return (
    <div>
      <div className='chalktitle'>Leaderboard</div>
      <span className='chalktitle'>Diamond Geezers...</span>
      <ul>
        {userObject.map((user, index) => (
          <li key={index} className='leadertext'>
            {index + 1} {user.username} - {user.winPercentage}% Win rate
          </li>
        ))}
      </ul>

      <div>
      <span className='chalktitle'>Top Boozer</span>
        {userWithMostWins && (
          <p className='leadertext'>
            {userWithMostWins.username} has won {userWithMostWins.betsWon} pints <br/>
            <span className='leadercomments'>(Absolutely Outrageous)</span>
          </p>
        )}
      </div>

      <div>
      <span className='chalktitle'>Top Weeper</span>
        {userWithMostLosses && (
          <p className='leadertext'>
            <b>{userWithMostLosses.username}</b> has had to buy {userWithMostLosses.betsLost} pints <br/>
            <span className='leadercomments'>(What an absolute mug!!)</span>
          </p>
        )}
      </div>

    </div>

  );
};

export default Leaderboard;
