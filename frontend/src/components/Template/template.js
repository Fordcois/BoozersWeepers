import React, { useEffect, useState } from 'react';
import VertNavbar from '../VertNavBar/VertNavBar';
import BlackboardHeader from '../blackboardHeader/blackboardHeader';
import NewSearchBar from '../NewSearch/NewSearch';
import '../../Pages/style.css';

const Template = ({ navigate }) => {
  const [token, setUserToken] = useState(window.localStorage.getItem('token'));
  const [expanded, setExpanded] = useState(true);
  const [list,setlist] = useState([])

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {const response = await fetch('/userdata', {headers: { Authorization: `Bearer ${token}` }});
        if (!response.ok) {throw new Error('Network response was not ok');}
        const userData = await response.json();
        setlist(userData.users) 
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
            <BlackboardHeader /> 
            <span className='chalktitle'>Welcome to the Workshop</span>

            <NewSearchBar SearchData={list}/>

          
          
          
          
          
          
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;