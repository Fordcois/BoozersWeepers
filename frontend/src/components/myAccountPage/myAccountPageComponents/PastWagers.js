import React, { useState, useEffect } from 'react';
import getSessionUserID from '../../Utility/getSignedInUser_id';
import NotificationDetails from './NotificationDetails';
import "../MyAccountPage.css"
import './notification.css'
import { Link } from 'react-router-dom';




const PastWagers = ({ navigate, wagers, expandedState }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const loggedInUser = getSessionUserID(token)
  const [expanded, setExpanded] = useState(expandedState !== undefined ? expandedState : true);
  
  useEffect(() => {
    setExpanded(expandedState);
  }, [expandedState]);
  
    if(token) {
      return(
        <div id="past-wagers" className="notificationdetails">

          {wagers.map((wager) => (
            <div key={wager._id}>
              {loggedInUser === wager.winner._id && wager.peopleInvolved[0]._id !== loggedInUser ?( 

                <div id="past-wager" className='wager' >
                  <Link to ={`/wager/${wager._id}`} className='individualwagerlink' state = {{expandedState: expanded }}>
                    You won your wager with {wager.peopleInvolved[0].username} that {wager.description}
                  </Link>
                </div>

              ) : loggedInUser === wager.winner._id && wager.peopleInvolved[1]._id !== loggedInUser ? (

                <div id="past-wager" className='wager' >
                  <Link to ={`/wager/${wager._id}`} className='individualwagerlink' state = {{expandedState: expanded }}>
                  You won your wager with {wager.peopleInvolved[1].username} that {wager.description}
                  </Link>
                </div>

              ) : loggedInUser !== wager.winner._id && wager.peopleInvolved[0]._id !== loggedInUser? (

                <div id="past-wager" className='wager' >
                  <Link to ={`/wager/${wager._id}`} className='individualwagerlink' state = {{expandedState: expanded }}>
                  You lost your wager with {wager.peopleInvolved[0].username} that {wager.description}
                  </Link>
                </div>

              ) : (

                <div id="past-wager" className='wager' >
                  <Link to ={`/wager/${wager._id}`} className='individualwagerlink' state = {{expandedState: expanded }}>
                  You lost your wager with {wager.peopleInvolved[1].username} that {wager.description}
                  </Link>
                </div>
                  
              )}
            </div>
          
      ))}

        </div>
      )
    } else {
      navigate('/login', {state : {expandedState:expanded}})
    }
}

export default PastWagers;
