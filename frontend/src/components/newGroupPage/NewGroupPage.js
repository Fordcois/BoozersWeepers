import VertNavbar from "../VertNavBar/VertNavBar";
import React, { useEffect, useState } from 'react';
import getSessionUserID from '../Utility/getSignedInUser_id';
import '../../Pages/style.css'
import { FaPencil } from "react-icons/fa6";
import { useLocation} from 'react-router-dom';


const NewGroupPage = ({navigate, change}) => {
	const [token, setToken] = useState(window.localStorage.getItem("token"));
	const loggedInUserId = getSessionUserID(token)
	const [groupName, setGroupName] = useState("")
	const [errorMsg, setErrorMsg] = useState("");
	const location = useLocation();
	const expandedState = location.state?.expandedState;
	const [expanded, setExpanded] = useState(expandedState !== undefined ? expandedState : true);

  




	const handlegroupNameChange = (event) => {
    setGroupName(event.target.value)

	}

	// When form is completed and submitted:
	const handleGroupSubmit = async (event) => {
		event.preventDefault();
		setGroupName('');

    if(token) {
			fetch( '/pubGroups', {
				method: 'post',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: groupName,
					members: [loggedInUserId],
				})
			})
		
		.then(async response => {
			if (response.status === 201) {
				console.log("Your group has been created")
				change();
				
			} else {
				const errorData = await response.json();
				setErrorMsg(errorData.message)
				console.log(errorData.message)
			}
		})
	}; 
	}


return (
	<form onSubmit={handleGroupSubmit} >
		<div>
		<div style={{display: 'flex', marginBottom: '10px'}}>
			<div style={{flex: '1%', justifyContent: 'flex-end'}}>
				<FaPencil style={{ transform: 'scaleX(-1)', color: 'whitesmoke', fontSize: '24px', marginRight:'2px',opacity:'0.2' }} />
			</div>

			<div style={{flex: '95%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
				<input placeholder="Enter your group name..." id="new-group-name" type='text' value={ groupName } onChange={handlegroupNameChange} />
			</div>
			</div>
			<div style={{textAlign:'right'}}>
				<input className='orange_Button_small' id='submit' type="submit" value="Submit" />
			</div>
		</div>
		<span className='chalk-error'>{errorMsg}</span>
	</form>

	// , alignItems: 'flex-start'



)}
export default NewGroupPage;




