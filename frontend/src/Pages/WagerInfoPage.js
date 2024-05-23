import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import getSessionUserID from '../components/Utility/getSignedInUser_id';
import VertNavbar from '../components/VertNavBar/VertNavBar';
import SinglePendingWager from '../components/singleWagerPageComponents/SinglePendingWager';
import SingleWagerRequest from '../components/singleWagerPageComponents/SingleWagerRequest';
import SingleOngoingWager from '../components/singleWagerPageComponents/SingleOngoingWager';
import SingleResolvedWager from '../components/singleWagerPageComponents/SingleResolvedWager';
import BlackboardHeader from '../components/blackboardHeader/blackboardHeader';
import WagerDetails from '../components/singleWagerPageComponents/WagerDetails';
import baseUrl from '../components/Utility/baseurl';
import '../Pages/style.css'


const WagerInfoPage = ({ navigate }) => {
  const { wagerID } = useParams();
  const [wagerData, setWagerData] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const loggedInUser = getSessionUserID(token)
  const location = useLocation();
  const expandedState = location.state?.expandedState;
  const [expanded, setExpanded] = useState(expandedState !== undefined ? expandedState : true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/wagers/${wagerID}`, 
        {headers: { Authorization: `Bearer ${token}` }});
        
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

return (
  <div className='shade'>
    <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
      <div className='blackboard'>
        <div className='form'>
          <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
          <BlackboardHeader expandedState={expanded}/> 

          {!wagerData ? (
              <div style={{ 'textAlign': 'center' }}>
                <span className="chalk" style={{ '--fsize': '34px' }}>No Wager Found</span>
                <span className="chalk" style={{ '--fsize': '28px', 'opacity': '0.8' }}>(Sorry!)</span>
              </div>
          ) : (
            <>
              <WagerDetails wagerData={wagerData}/>
              {wagerData.approved === false && wagerData.peopleInvolved[0]._id === loggedInUser ? (
                <SinglePendingWager wagerData={wagerData} expandedState={expanded}/>
              ) : wagerData.approved === false && wagerData.peopleInvolved[1]._id === loggedInUser ? (
                <SingleWagerRequest wagerData={wagerData} expandedState={expanded}/>
              ) : wagerData.approved === true && wagerData.winner === null ? (
                <SingleOngoingWager wagerData={wagerData} expandedState={expanded}/>
              ) : wagerData.winner !== null ? (
                <SingleResolvedWager wagerData={wagerData} expandedState={expanded}/>
              ) : (
                <p>Error - return to account page</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  </div>
);}

export default WagerInfoPage;
