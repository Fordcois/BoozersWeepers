import React, { useEffect, useState } from 'react';
import SingleUser from './Singleuser';
import NewSearchBar from '../NewSearch/NewSearch';
import VertNavbar from '../VertNavBar/VertNavBar';
import getSessionUserID from '../Utility/getSignedInUser_id';
import BlackboardHeader from '../blackboardHeader/blackboardHeader';
import './userlist.css'

const UserList = () => {
  const [ListOfUsers, setUsernames] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [expanded, setExpanded] = useState(true);



  
  const toggleExpand = () => {setExpanded(!expanded);};

  useEffect(() => {
    const fetchData = async () => {
      try {const response = await fetch('/userdata', {headers: { Authorization: `Bearer ${token}` }});
        if (!response.ok) {throw new Error('Network response was not ok');}
        const userData = await response.json();
        const userList1 = userData.users
        const userList = userList1.filter(user => user._id !== getSessionUserID(token))
        setUsernames(userList);
    } catch (error) {console.error('Error fetching user data:', error);}
    };

    fetchData();
  }, [token]); 

  return (

  <div className='shade'>
  <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
    <div className='blackboard'>
      <div className='form'>
      <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
      <BlackboardHeader/>
      <span className="chalktitle-center" style={{ '--fsize': '34px' ,'--talign': 'center'}}>New Wager</span>

      <span className="chalk" style={{ '--fsize': '24px' ,'--talign': 'left'}}> Who would you like to Challenge?</span>
      <span className="chalk" style={{ '--fsize': '16px' ,'--talign': 'left', 'marginBottom': '2%' }}>Enter atleast 2 Characters from the users name or username...</span>
      <NewSearchBar SearchData={ListOfUsers}/>

    
  
    </div>
	</div>
  </div>
	</div>
  );
};

export default UserList;
