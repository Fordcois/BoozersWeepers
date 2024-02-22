import React, { useEffect, useState } from 'react';
import isTokenValid from '../Utility/isTokenValid';
import getSessionUserID from '../Utility/getSignedInUser_id';
import VertNavbar from '../VertNavBar/VertNavBar';
import BlackboardHeader from '../blackboardHeader/blackboardHeader';
import AccountPageList from './myAccountPageComponents/accountpageList';
import '../../Pages/style.css'
import OngoingWagers from './myAccountPageComponents/ongoingWagers';
import PastWagers from './myAccountPageComponents/PastWagers';
import UnresolvedWagers from './myAccountPageComponents/UnresolvedWagers';
import IncomingWagers from './myAccountPageComponents/IncomingWagers';
import PendingWagers from './myAccountPageComponents/PendingWagers';

const MyAccountPage = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [wagers, setWagers] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
  const [expanded, setExpanded] = useState(true);
  const [LoggedInUserID, setLoggedInUserID] = useState (getSessionUserID(token))
  const [showIncoming, setShowIncoming] = useState(null)
  const [showOngoing, setShowOngoing] = useState(null)
  const [showPending, setShowPending] = useState(null)
  const [showUnresolved, setShowUnresolved] = useState(null)
  const [showHistory, setShowHistory] = useState(null)
  
// Returns True if deadline has not yet passed, false if deadline is over and wager is complete
  const checkIfOngoing = (deadline) => {
    const currentDate = new Date()
    const deadlineDate = new Date(deadline)
    return (deadlineDate > currentDate)
    }
  
  useEffect((event) => {
    if(token) {
      fetch("/wagers", {headers: {'Authorization': `Bearer ${token}`}})
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setWagers(data.wagers)
        })
      }

    if (!isLoggedIn) {navigate('/');}
    }, [navigate, isLoggedIn, token]);

    // added an extra filter to show wagers that the signed in user is involved with
    const myWagers = wagers.filter(wager => wager.peopleInvolved[0]._id === LoggedInUserID || wager.peopleInvolved[1]._id === LoggedInUserID)
    // Gets wagers which have been sent from other users to be approved by logged-in user
    const wagerRequests = myWagers.filter(wager => wager.approved === false && wager.peopleInvolved[1]._id === LoggedInUserID)
    // Gets ongoing wagers -> they have been approved by both users and are still within the time limit
    const ongoingWagers = myWagers.filter(wager => wager.approved === true && checkIfOngoing(wager.deadline) && wager.winner === null)
    // Gets pending wagers -> they have been sent but not yet approved by the person you sent it to
    const pendingWagers = myWagers.filter(wager => wager.peopleInvolved[0]._id === LoggedInUserID && wager.approved === false)
    // Gets unresolved wagers -> they are past the deadline, have been approved  but haven't declared a winner yet
    const unresolvedWagers = myWagers.filter(wager => checkIfOngoing(wager.deadline) === false && wager.winner === null && wager.approved !== false)
    // Gets past wagers -> wagers which have been resolved and have a winner declared
    const pastWagers = myWagers.filter(wager => wager.winner != null)
    
    const toggleExpand = () => {setExpanded(!expanded);};

    useEffect(() => {
      if (!isLoggedIn) {navigate('/');}
      }, [navigate, isLoggedIn]);
  
return (
<div className='shade'>
  <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
    <div className='blackboard'>
      <div className='form'>
        <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
        <BlackboardHeader />
        
        <div className='chalktitle'>My Wagers</div>
        
        <AccountPageList List={wagerRequests} showState={showIncoming} updateStateFunction={setShowIncoming} Heading={'My incoming Wagers'} ResultsComponent={IncomingWagers} />
        <AccountPageList List={unresolvedWagers} showState={showUnresolved} updateStateFunction={setShowUnresolved} Heading={'My Unresolved Wagers'} ResultsComponent={UnresolvedWagers} />
        <AccountPageList List={pendingWagers} showState={showPending} updateStateFunction={setShowPending} Heading={'My Pending Wagers'} ResultsComponent={PendingWagers} />
        <AccountPageList List={ongoingWagers} showState={showOngoing} updateStateFunction={setShowOngoing} Heading={'My Ongoing Wagers'} ResultsComponent={OngoingWagers} />
        <AccountPageList List={pastWagers} showState={showHistory} updateStateFunction={setShowHistory} Heading={'My Past Wagers'} ResultsComponent={PastWagers} />
        
      </div>
    </div>
  </div>
</div>
)};
    
export default MyAccountPage;
