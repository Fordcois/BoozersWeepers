import React, { useState, useEffect } from 'react';
import "./NewWagerForm.css";
import { useParams } from "react-router-dom"
import VertNavbar from '../VertNavBar/VertNavBar';
import Header from '../header/Header';
import '../../Pages/style.css'
import { FaPencil } from "react-icons/fa6";
import BlackboardHeader from '../blackboardHeader/blackboardHeader';

const NewWagerForm = ({ navigate }) => {
	const {challengedUserID} = useParams()
	const [description, setDescription] = useState("");
	const [deadline, setDeadline] = useState("");
	const [token, setToken] = useState(window.localStorage.getItem("token"));
	const [expanded, setExpanded] = useState(true);
	const [userData, setUserData] = useState(null)

	const toggleExpand = () => {setExpanded(!expanded);};


	useEffect(() => {
    if (token) {
    
      fetch(`/userData/${challengedUserID}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(async userData => {
        window.localStorage.setItem("token", userData.token);
        setToken(window.localStorage.getItem("token"));
        

        setUserData(userData.user);

      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      
      });
    }
  }, []); 

	const handleWagerSubmit = async (event) => {
		event.preventDefault();

    if(token) {
			fetch( '/wagers', {
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
	} navigate("/myAccount");
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
				<>
					<div className='shade'>

						<div className={`page-content ${expanded ? 'shifted-content' : ''}`}>

						<div className='blackboard'>
				
							<VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
							<BlackboardHeader/>

								<div className="NewWager"> 
								
										<form onSubmit={handleWagerSubmit}>
											<span id="page_subheading" className="chalk" style={{ margin: '2rem', '--fsize': '3rem'}}>Create a wager with {userData.username}</span>

											<span className="chalk" style={{ display: 'inline', '--fsize': '1.5rem'}}> You bet that... </span>
											<div style={{ display: 'inline',justifyContent: 'flex-end' }}>
												<FaPencil style={{ transform: 'scaleX(-1)', color: 'whitesmoke', fontSize: '24px', marginRight:'2px',opacity:'0.2' }} />
											</div>
											<input placeholder="Bet description" id="description" type='text' value={description} onChange={handleDescriptionChange} style={{marginRight: '0.5rem'}}/>
											<br></br>
											<span className="chalk" style={{ display: 'inline', '--fsize': '1.5rem'}}> To be resolved by... </span>
											<input placeholder="Deadline" id="deadline" type='date' value={deadline} onChange={handleDeadlineChange} /><br></br>
											
											<button class="orange_Button" id="submit" style={{margin: '1em'}}>Submit </button>
										</form>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
	
} else {
	navigate("/../login");
}
	
}


export default NewWagerForm