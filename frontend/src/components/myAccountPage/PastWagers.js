import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import getSessionUserID from '../Utility/getSignedInUser_id';
import { FaCircle } from "react-icons/fa";
import '../myAccountPage/MyAccountPage.css'

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
                    <FaCircle  size={10}/> You won your wager with {wager.peopleInvolved[0].username} that {wager.description}
                  </Link>
                </div>

              ) : loggedInUser === wager.winner._id && wager.peopleInvolved[1]._id !== loggedInUser ? (

                <div id="past-wager" className='wager' >
                  <Link to ={`/wager/${wager._id}`} className='individualwagerlink' state = {{expandedState: expanded }}>
                    <FaCircle  size={10}/> You won your wager with {wager.peopleInvolved[1].username} that {wager.description}
                  </Link>
                </div>

              ) : loggedInUser !== wager.winner._id && wager.peopleInvolved[0]._id !== loggedInUser? (

                <div id="past-wager" className='wager' >
                  <Link to ={`/wager/${wager._id}`} className='individualwagerlink' state = {{expandedState: expanded }}>
                    <FaCircle  size={10}/> You lost your wager with {wager.peopleInvolved[0].username} that {wager.description}
                  </Link>
                </div>

              ) : (

                <div id="past-wager" className='wager' >
                  <Link to ={`/wager/${wager._id}`} className='individualwagerlink' state = {{expandedState: expanded }}>
                    <FaCircle  size={10}/> You lost your wager with {wager.peopleInvolved[1].username} that {wager.description}
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
