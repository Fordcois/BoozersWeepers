import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getSessionUserID from '../Utility/getSignedInUser_id';
import { FaCircle } from "react-icons/fa";
import '../myAccountPage/MyAccountPage.css'

const UnresolvedWagers = ({ navigate, wagers, expandedState }) => {
	const [token, setToken] = useState(window.localStorage.getItem("token"));
	const loggedInUser = getSessionUserID(token)
	const [expanded, setExpanded] = useState(expandedState !== undefined ? expandedState : true);
	
	useEffect(() => {
		setExpanded(expandedState);
	  }, [expandedState]);


	if(token) {
			return(
				<div id="unresolved-wagers-feed" className="notificationdetails">
				
					{wagers.map((wager) => (
					<div key={wager._id}>
						<Link to ={`/wager/${wager._id}`} className='individualwagerlink' state = {{expandedState: expanded }}><FaCircle  size={10}/> Time's Up! Who won the wager that {wager.description}? </Link>
					</div>))}
				</div>

				
				
			)} else {
			navigate('/login', { state: { expandedState: expanded } });
		}
	}

export default UnresolvedWagers;