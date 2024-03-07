import React, { useEffect, useState } from 'react';
import VertNavbar from '../VertNavBar/VertNavBar';
import BlackboardHeader from '../blackboardHeader/blackboardHeader';
import '../../Pages/style.css';
import { useParams } from 'react-router-dom';



const Template = ({ navigate }) => {
  const [token, setUserToken] = useState(window.localStorage.getItem('token'));
  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => {setExpanded(!expanded);};
  const [groupWagers,setGroupWagers] = useState([])
  
  useEffect(() => {
    if(token) {
        fetch("/wagers/groups", {
            method: 'get',
            headers: {'Authorization': `Bearer ${token}`}
        })
            .then(response => response.json())
            .then(async data => {
              window.localStorage.setItem("token", data.token)
              setUserToken(window.localStorage.getItem("token"))
              console.log(data)
            })
    }
}, []);

useEffect(() => {
    console.log(groupWagers);
}, [groupWagers]);

  return (
    <div className='shade'>
      <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
        <div className='blackboard'>
          <div className='form'>
            <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
            <BlackboardHeader expandedState={expanded}/> 
            <span className='chalktitle'>Welcome to the Workshop </span>





          Hello This is my stuff

          
          
          
          
          
          
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;