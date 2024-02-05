import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getSessionUserID from '../Utility/getSignedInUser_id';
import VertNavbar from '../VertNavBar/VertNavBar';
import SinglePendingWager from './childComponents/SinglePendingWager';
import SingleWagerRequest from './childComponents/SingleWagerRequest';
import SingleOngoingWager from './childComponents/SingleOngoingWager';
import SingleResolvedWager from './childComponents/SingleResolvedWager';
import '../../Pages/style.css'
import BlackboardHeader from '../blackboardHeader/blackboardHeader';



const WagerInfoPage = ({ navigate }) => {
  const { wagerID } = useParams();
  const [wagerData, setWagerData] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [expanded, setExpanded] = useState(true);
  const loggedInUser = getSessionUserID(token)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/wagers/${wagerID}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!response.ok) { throw new Error('Network response was not ok');}
        
        const fetchedData = await response.json();
        
        window.localStorage.setItem('token', fetchedData.token);
        setToken(window.localStorage.getItem('token'));
        setWagerData(fetchedData.wager);
      } catch (error) { console.error('Error fetching wager data:', error); }
    };
    
    fetchData();
  }, [token, wagerID]);

const toggleExpand = () => {setExpanded(!expanded);};


if (!wagerData) {
  return(
    <div>
    <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
    <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
      <p id='loading-message' className='loading-message'>Loading...</p>
    </div>
  </div>
  )
} else {

  return (
    <div className='shade'>
    <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
      <div className='blackboard'>
        <div className='form'>
          <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
          <BlackboardHeader /> 





          

        
    
        <h1 id='single-wager-page-header' className='page_subheading'>Wager Details</h1>
        { wagerData.approved === false && wagerData.peopleInvolved[0]._id === loggedInUser ? (
      
            <SinglePendingWager wagerData={wagerData}/>
      
            ) : wagerData.approved === false && wagerData.peopleInvolved[1]._id === loggedInUser ? (
        
            <SingleWagerRequest wagerData={wagerData}/>
        
            ) : wagerData.approved === true && wagerData.winner === null ? (
          
            <SingleOngoingWager wagerData={wagerData}/>
          
            ) : wagerData.winner !== null ? (
            
            <SingleResolvedWager wagerData={wagerData}/>
            
            ) : (
            <p>Error - return to account page</p>
        )}
        </div>
      </div>
    </div>
  </div>
      )
    }
  }

export default WagerInfoPage;
