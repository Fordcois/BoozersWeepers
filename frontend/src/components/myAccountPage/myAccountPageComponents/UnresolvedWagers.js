import React, { useState } from 'react';
import "../MyAccountPage.css"
import './notification.css'
import getSessionUserID from '../../Utility/getSignedInUser_id';

const UnresolvedWagers = ({ navigate, wagers }) => {
	const [token, setToken] = useState(window.localStorage.getItem("token"));
	const loggedInUser = getSessionUserID(token)


	if(token) {
			return(
				<div id="unresolved-wagers-feed" className="notificationdetails">
				
					{wagers.map((wager) => (
					<div key={wager._id}>
						
					<a className='individualwagerlink' href={`/Wager/${wager._id}`} >
						Time's Up! Who won the wager that {wager.description}?
					</a>
					</div>))}
				</div>

				
				
			)} else {
			navigate('/login')
		}
	}

export default UnresolvedWagers;