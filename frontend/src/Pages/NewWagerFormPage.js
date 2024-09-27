import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom"
import { FaPencil } from "react-icons/fa6";
import PageLayout from '../components/PageLayout/PageLayout';

import '../Pages/style.css'
import baseUrl from '../components/Utility/baseurl';

const NewWagerForm = ({ navigate }) => {
	const {challengedUserID} = useParams()
	const [description, setDescription] = useState("");
	const [deadline, setDeadline] = useState("");
	const [token, setToken] = useState(window.localStorage.getItem("token"));
	const [userData, setUserData] = useState(null)
  const location = useLocation();
  const expandedState = location.state?.expandedState;
  const [expanded, setExpanded] = useState(expandedState !== undefined ? expandedState : true);

	useEffect(() => {
    if (token) {
      fetch(`${baseUrl}/userData/${challengedUserID}`, {
        headers: {'Authorization': `Bearer ${token}`}
      })
      .then(response => response.json())
      .then(async userData => {
        window.localStorage.setItem("token", userData.token);
        setToken(window.localStorage.getItem("token"));
        setUserData(userData.user);
      })
      .catch(error => {console.error('Error fetching user data:', error);});
    }
  }, []); 

	const handleWagerSubmit = async (event) => {
		event.preventDefault();

    if(token) {
		fetch( `${baseUrl}/wagers`, {
			method: 'post',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				description: description,
				deadline: deadline,
				challengedUser: challengedUserID
			})
		})
		.then(response => {
			if (response.status === 201) {
				console.log("Your wager has been created")
				return response.json();
			} else {
				console.log("Failed to create a wager")
			}
		})
	} navigate("/myAccount", { state: { expandedState: expanded } });
	}
	const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }
  
  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value)
  }

if (token) {
	return (
<>
{userData && (
<PageLayout expanded={expanded} setExpanded={setExpanded}>

      <div className="NewWager"> 
        <form onSubmit={handleWagerSubmit} style={{width:'auto'}}>
          
          <span id="page_subheading" className="chalk" style={{ margin: '2rem', '--fsize': '3rem'}}>Create a wager with {userData.username}</span>
          <span className="chalk" style={{ display: 'inline', '--fsize': '1.5rem'}}> You bet that... </span>

            <div style={{ display: 'inline',justifyContent: 'flex-end' }}>
              <FaPencil style={{ transform: 'scaleX(-1)', color: 'whitesmoke', fontSize: '24px', marginRight:'4px',opacity:'0.2' }} />
            </div>

          <input placeholder="Bet description" id="description" type='text' value={description} onChange={handleDescriptionChange} style={{ marginTop: '1rem', width:'15rem'}}/>
          <br/>

          <span className="chalk" style={{ display: 'inline', '--fsize': '1.5rem'}}> To be resolved by... </span>
          <input placeholder="Deadline" id="deadline" type='date' value={deadline} onChange={handleDeadlineChange}/>
          <br/>

          <button class="orange_Button" id="submit" style={{marginTop: '0.5em', marginBottom: '2em'}}>Submit </button>
        </form>
      </div>

    
</PageLayout>
)}
</>
);

} else 
  {navigate("/../login", { state: { expandedState: expanded } });}
}


export default NewWagerForm