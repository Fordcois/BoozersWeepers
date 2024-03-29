import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCircle } from "react-icons/fa";
import '../myAccountPage/MyAccountPage.css'



const IncomingWagers = (props, { navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [wagers, setData] = useState(props.wagers)
  const [userBet, setUserBet] = useState(null)
  const [expanded, setExpanded] = useState(props.expandedState !== undefined ? props.expandedState : true);

  useEffect(() => {
    setExpanded(props.expandedState);
  }, [props.expandedState]);


    if(token) {
      return(
        <div id="incoming Wagers">

          {/*  this is the main loop to crate a list of wagers, the notification details component is need to get the 
          user details for each   */}
        

          <div className="notificationdetails">{props.wagers.map((wager) => (
            <div key={wager._id}>
              <Link to ={`/wager/${wager._id}`} className='individualwagerlink' state = {{expandedState: expanded }}><FaCircle  size={10}/> {wager.peopleInvolved[0].username} would like to wager! </Link>

            </div>))}
          </div>

        </div>

      )
    } else {
    navigate('/login', { state: { expandedState: expanded } });
    }
}

export default IncomingWagers;
