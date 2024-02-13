import React, { useState, useEffect } from 'react';
import calculateUserStats from './reworkstats';
import './leaderstats.css'

const Leaderboard = () => {
  const [userToken, setUserToken] = useState(window.localStorage.getItem("token"));
  const [pintsData, setpintsData] = useState([]);
  const [userObject, setuserObject] = useState([]);
  const [topPintsOwedNotClaimed, setTopPintsOwedNotClaimed] = useState(null);
  const [topPintsOwnedClaimed, setTopPintsOwnedClaimed] = useState(null);

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
    const userWithTopPintsOwedNotClaimed = userObjectArray.reduce((prev, current) =>
      prev.pintsOwedNotClaimed > current.pintsOwedNotClaimed ? prev : current, {});

    setTopPintsOwedNotClaimed(userWithTopPintsOwedNotClaimed);

    // Find user with the highest pintsOwnedClaimed
    const userWithTopPintsOwnedClaimed = userObjectArray.reduce((prev, current) =>
      prev.pintsOwnedClaimed > current.pintsOwnedClaimed ? prev : current, {});

    setTopPintsOwnedClaimed(userWithTopPintsOwnedClaimed);

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
        {topPintsOwedNotClaimed && (
          <p className='leadertext'>
            <b>{topPintsOwedNotClaimed.username}</b>  has {topPintsOwedNotClaimed.pintsOwedNotClaimed} pints with their name on it<br/>
            <span className='leadercomments'>(Absolutely Outrageous)</span>
          </p>
        )}
      </div>

      <div>
      <span className='chalktitle'>Top Weeper</span>
        {topPintsOwnedClaimed && (
          <p className='leadertext'>
            {topPintsOwnedClaimed.username} still owes {topPintsOwnedClaimed.pintsOwnedClaimed} pints <br/>
            <span className='leadercomments'>(Don't let 'em wriggle out of it!!)</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
