import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import isTokenValid from '../components/Utility/isTokenValid';
import getSessionUserID from '../components/Utility/getSignedInUser_id';
import AccountPageList from '../components/myAccountPage/accountpageList';
import OngoingWagers from '../components/myAccountPage/ongoingWagers';
import PastWagers from '../components/myAccountPage/PastWagers';
import UnresolvedWagers from '../components/myAccountPage/UnresolvedWagers';
import IncomingWagers from '../components/myAccountPage/IncomingWagers';
import PendingWagers from '../components/myAccountPage/PendingWagers';
import baseUrl from '../components/Utility/baseurl';
import PageLayout from '../components/PageLayout/PageLayout';
import '../Pages/style.css'

const MyAccountPage = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [wagers, setWagers] = useState([]);
  const location = useLocation();
  const [expanded, setExpanded] = useState(location.state?.expandedState ?? true);
  const [isLoggedIn] = useState(isTokenValid(token));
  const [loggedInUserID] = useState(getSessionUserID(token));
  const [showIncoming, setShowIncoming] = useState(null);
  const [showOngoing, setShowOngoing] = useState(null);
  const [showPending, setShowPending] = useState(null);
  const [showUnresolved, setShowUnresolved] = useState(null);
  const [showHistory, setShowHistory] = useState(null);
  
// Returns True if deadline has not yet passed, false if deadline is over and wager is complete
  const checkIfOngoing = (deadline) => {
    const currentDate = new Date()
    const deadlineDate = new Date(deadline)
    return (deadlineDate > currentDate)
    }
  
  useEffect(() => {
    if (!isLoggedIn) {navigate('/', { state: { expandedState: expanded } })};
    
    if(token) {
        fetch(`${baseUrl}/wagers/findall/${loggedInUserID}`, {headers: {'Authorization': `Bearer ${token}`}})
          .then(response => response.json())
          .then(async data => {
            window.localStorage.setItem("token", data.token)
            setToken(window.localStorage.getItem("token"))
            setWagers(data.wagers)
          })
      }
    }, []);

    // Gets wagers which have been sent from other users to be approved by logged-in user
    const wagerRequests = wagers.filter(wager => wager.approved === false && wager.peopleInvolved[1]._id === loggedInUserID)
    // Gets ongoing wagers -> they have been approved by both users and are still within the time limit
    const ongoingWagers = wagers.filter(wager => wager.approved === true && checkIfOngoing(wager.deadline) && wager.winner === null)
    // Gets pending wagers -> they have been sent but not yet approved by the person you sent it to
    const pendingWagers = wagers.filter(wager => wager.peopleInvolved[0]._id === loggedInUserID && wager.approved === false)
    // Gets unresolved wagers -> they are past the deadline, have been approved  but haven't declared a winner yet
    const unresolvedWagers = wagers.filter(wager => checkIfOngoing(wager.deadline) === false && wager.winner === null && wager.approved !== false)
    // Gets past wagers -> wagers which have been resolved and have a winner declared
    const pastWagers = wagers.filter(wager => wager.winner != null)
    


return (
  <PageLayout expanded={expanded} setExpanded={setExpanded}>

        
        <div className='chalktitle'>My Wagers</div>

        {wagers.length === 0 && 
        wagerRequests.length === 0 && 
        ongoingWagers.length === 0 && 
        pendingWagers.length === 0 && 
        unresolvedWagers.length === 0 && 
        pastWagers.length === 0 ? 
        <div style={{textAlign:'center', height:'20vh'}}>
          <span className="chalk" style={{ marginTop:'5%','--fsize': '22px', color: '#cd561b'}}> No bets found!</span>
          <span className="chalk" style={{ marginTop:'1%','--fsize': '19px', color: 'whitesmoke' }}>(<a className="chalk-link" href={`/newWager`}>Challenge Somebody to start earning Pints</a>)</span>                       
        </div>
          : null}
        
        <AccountPageList list={wagerRequests} showState={showIncoming} updateStateFunction={setShowIncoming} heading={'My Incoming Wagers'} ResultsComponent={IncomingWagers} color={'#cd561b'} expandedState={expanded} />
        <AccountPageList list={unresolvedWagers} showState={showUnresolved} updateStateFunction={setShowUnresolved} heading={'My Unresolved Wagers'} ResultsComponent={UnresolvedWagers} color={'#cd561b'} expandedState={expanded}/>
        <AccountPageList list={pendingWagers} showState={showPending} updateStateFunction={setShowPending} heading={'My Pending Wagers'} ResultsComponent={PendingWagers} color={'whitesmoke'} expandedState ={expanded}/>
        <AccountPageList list={ongoingWagers} showState={showOngoing} updateStateFunction={setShowOngoing} heading={'My Ongoing Wagers'} ResultsComponent={OngoingWagers} color={'whitesmoke'} expandedState={expanded}/>
        <AccountPageList list={pastWagers} showState={showHistory} updateStateFunction={setShowHistory} heading={'My Past Wagers'} ResultsComponent={PastWagers} color={'whitesmoke'} expandedState={expanded}/>
        
        </PageLayout>
)};
    
export default MyAccountPage;
