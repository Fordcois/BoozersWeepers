import React, { useEffect, useState } from 'react';
import VertNavbar from '../VertNavBar/VertNavBar';
import BlackboardHeader from '../blackboardHeader/blackboardHeader';
import '../../Pages/style.css';
import { useParams } from 'react-router-dom';

import SingleUserStats from '../stats/getSingleUserStats';

const Template = ({ navigate }) => {
  const [token, setUserToken] = useState(window.localStorage.getItem('token'));
  const [expanded, setExpanded] = useState(true);
  const [list,setlist] = useState([])
  const [ID,setID] = useState('65b3cb2aa30533d477e17ff2')
  const { name, lastName } = useParams();
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  
//test






  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {const response = await fetch(`/wagers/findall/${ID}`, 
  //     {headers: { Authorization: `Bearer ${token}` }});
  //       if (!response.ok) {throw new Error('Network response was not ok');}
  //       const userData = await response.json();
  //       console.log(userData)
  //   } catch (error) {console.error('Error fetching user data:', error);}
  //   };

  //   fetchData();
  // }, [token]); 

  return (
    <div className='shade'>
      <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
        <div className='blackboard'>
          <div className='form'>
            <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
            <BlackboardHeader /> 
            <span className='chalktitle'>Welcome to the Workshop, {name} {lastName} </span>





            

          
          
          
          
          
          
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;