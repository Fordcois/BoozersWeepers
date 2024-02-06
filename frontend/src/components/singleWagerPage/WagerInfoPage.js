import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getSessionUserID from '../Utility/getSignedInUser_id';
import VertNavbar from '../VertNavBar/VertNavBar';
import SinglePendingWager from './childComponents/SinglePendingWager';
import SingleWagerRequest from './childComponents/SingleWagerRequest';
import SingleOngoingWager from './childComponents/SingleOngoingWager';
import SingleResolvedWager from './childComponents/SingleResolvedWager';
import BlackboardHeader from '../blackboardHeader/blackboardHeader';
import '../../Pages/style.css'
import WagerDetails from './childComponents/WagerDetails';


const WagerInfoPage = ({ navigate }) => {
  const { wagerID } = useParams();
  const [wagerData, setWagerData] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [expanded, setExpanded] = useState(true);
  const loggedInUser = getSessionUserID(token)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/wagers/${wagerID}`, 
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
console.log(wagerData);

return (
  <div className='shade'>
    <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
      <div className='blackboard'>
        <div className='form'>
          <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
          <BlackboardHeader /> 

          {!wagerData ? (
              <div style={{ 'textAlign': 'center' }}>
                <span className="chalk" style={{ '--fsize': '34px' }}>No Wager Found</span>
                <span className="chalk" style={{ '--fsize': '28px', 'opacity': '0.8' }}>(Sorry!)</span>
              </div>
          ) : (
            <>
              <WagerDetails wagerData={wagerData}/>
              {/* {wagerData.approved === false && wagerData.peopleInvolved[0]._id === loggedInUser ? (
                <SinglePendingWager wagerData={wagerData}/>
              ) : wagerData.approved === false && wagerData.peopleInvolved[1]._id === loggedInUser ? (
                <SingleWagerRequest wagerData={wagerData}/>
              ) : wagerData.approved === true && wagerData.winner === null ? (
                <SingleOngoingWager wagerData={wagerData}/>
              ) : wagerData.winner !== null ? (
                <SingleResolvedWager wagerData={wagerData}/>
              ) : (
                <p>Error - return to account page</p>
              )} */}
            </>
          )}
        </div>
      </div>
    </div>
  </div>
);}

export default WagerInfoPage;
