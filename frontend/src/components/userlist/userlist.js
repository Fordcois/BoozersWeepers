import React, { useEffect, useState } from 'react';
import SingleUser from './Singleuser';
import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import VertNavbar from '../VertNavBar/VertNavBar';
import getSessionUserID from '../Utility/getSignedInUser_id';

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

        const userList1 = userData.users.map((user) => user);
        const userList = userList1.filter(user => user._id != getSessionUserID(token))
        console.log(userList) 
        setUsernames(userList);
        console.log(userList)

    } catch (error) {console.error('Error fetching user data:', error);}
    };

    fetchData();
  }, [token]); 

  return (
	<div>
          <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
          <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
         
      
    </div >
    <SearchBar message={"Search for a user..."} list={ListOfUsers}/>
	  <li>
		{ListOfUsers.map((user) => (
		  <SingleUser SelectedUser={user} key={user._id} />
		))}
	  </li>
	</div>
  );
};

export default UserList;