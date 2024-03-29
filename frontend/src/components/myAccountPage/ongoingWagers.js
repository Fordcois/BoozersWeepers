import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getSessionUserID from '../Utility/getSignedInUser_id';
import { FaCircle } from "react-icons/fa";
import '../myAccountPage/MyAccountPage.css'

const OngoingWagers = ({ navigate, wagers, expandedState }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const loggedInUser = getSessionUserID(token)
  const [expanded, setExpanded] = useState(expandedState !== undefined ? expandedState : true);

  useEffect(() => {
    setExpanded(expandedState);
  }, [expandedState]);

  if (token) {
    return (
      <div id="ongoing-wagers-feed" className="notificationdetails">
        {wagers.map((wager) => (
          <div key={wager._id}>
            {wager.peopleInvolved[0]._id === loggedInUser ? 
            (
            <Link to ={`/wager/${wager._id}`} className='individualwagerlink' state = {{expandedState: expanded }}>
              <FaCircle  size={10}/> You bet {wager.peopleInvolved[1].username} that {wager.description} <br/>
            </Link>

            ) 
            : 
            (
            <Link to ={`/wager/${wager._id}`} className='individualwagerlink' state = {{expandedState: expanded }}>
              <FaCircle  size={10}/> {wager.peopleInvolved[0].username} bet you that {wager.description} <br/>
            </Link>
            )}
          </div>
        ))}
      </div>
    );
  } else {
    navigate('/login', { state: { expandedState: expanded } });
    return null; 
  }
};

export default OngoingWagers;