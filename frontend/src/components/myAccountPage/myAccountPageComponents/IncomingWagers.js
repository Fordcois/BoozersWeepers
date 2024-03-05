import React, { useEffect, useState } from 'react';
import NotificationDetails from './NotificationDetails';
import "../MyAccountPage.css"



const IncomingWagers = (props, { navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [wagers, setData] = useState(props.wagers)
  const [userBet, setUserBet] = useState(null)

  

    if(token) {
      return(
        <div id="incoming Wagers">

          {/*  this is the main loop to crate a list of wagers, the notification details component is need to get the 
          user details for each   */}
        

          <div className="notificationdetails">{props.wagers.map((wager) => (
            <div key={wager._id}>
              <a className='individualwagerlink' href={`/wager/${wager._id}`}>{wager.peopleInvolved[0].username} would like to wager!</a><br />

            </div>))}
          </div>

        </div>

      )
    } else {
    navigate('/login')
    }
}

export default IncomingWagers;
