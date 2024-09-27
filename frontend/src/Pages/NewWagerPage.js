import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageLayout from '../components/PageLayout/PageLayout';
import getSessionUserID from '../components/Utility/getSignedInUser_id';
import SearchBar from '../components/searchbarComponent/Searchbar';
import baseUrl from '../components/Utility/baseurl';
import '../components/searchResultSingleUser/userlist.css'


const NewWagerPage = () => {
  const [ListOfUsers, setUsernames] = useState([]);
  const [token] = useState(window.localStorage.getItem("token"));
  const location = useLocation();
  const [expanded, setExpanded] = useState(location.state?.expandedState ?? true);

  useEffect(() => {
    const fetchData = async () => {
      try {const response = await fetch(`${baseUrl}/userdata`, {headers: { Authorization: `Bearer ${token}` }});
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
  <PageLayout expanded={expanded} setExpanded={setExpanded}>

      <span className="chalktitle-center" style={{ '--fsize': '34px' ,'--talign': 'center'}}>New Wager</span>

      <span className="chalk" style={{ '--fsize': '24px' ,'--talign': 'left'}}> Who would you like to Challenge?</span>
      <span className="chalk" style={{ '--fsize': '16px' ,'--talign': 'left', 'marginBottom': '2%' }}>Enter atleast 3 Characters from the users name or username...</span>
      <SearchBar searchData={ListOfUsers} expandedState ={expanded} searchMode={'users'}/>

  </PageLayout>

  );
};

export default NewWagerPage;
