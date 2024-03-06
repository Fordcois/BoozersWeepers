import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './notification.css'
import "../MyAccountPage.css"


const PendingWagers = ({ navigate, wagers, expandedState }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [expanded, setExpanded] = useState(expandedState !== undefined ? expandedState : true);
  
  useEffect(() => {
    setExpanded(expandedState);
  }, [expandedState]);

    if(token) {
      return(
        <div id="pending-wagers">

						<div id="pending-wager" className='wager'>
              <div className="notificationdetails" > 
                {wagers.map((wager) => (
                    <Link to ={`/wager/${wager._id}`} className='individualwagerlink' state = {{expandedState: expanded }}> 
                      Waiting for {wager.peopleInvolved[1].username} to respond to your wager that {wager.description}
                   <br/> </Link>
              ))}
              </div>
            </div>

        </div>
      )
    } else {
      navigate('/login', { state: { expandedState: expanded } });
    }
}

export default PendingWagers;
