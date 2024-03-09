import VertNavbar from '../VertNavBar/VertNavBar';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import isTokenValid from '../Utility/isTokenValid';
import getSessionUserID from '../Utility/getSignedInUser_id';
import '../../Pages/style.css'
import BlackboardHeader from '../blackboardHeader/blackboardHeader';
import { useLocation } from 'react-router-dom';

const SingleGroupPage = ({ navigate }) => {
const { pubGroupId } = useParams();
const [pubGroupData, setPubGroupData] = useState(null);
const [wagers, setWagers] = useState([]);
const [token, setToken] = useState(window.localStorage.getItem("token"));
const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
const [hasJoinedGroup, setHasJoinedGroup] = useState(false);
const [hasLeftGroup, setHasLeftGroup] = useState(false);

const [groupWagers,setGroupWagers] = useState([])
const [groupMembers,setGroupMembers] = useState([])



const location = useLocation();
const expandedState = location.state?.expandedState;
const [expanded, setExpanded] = useState(expandedState !== undefined ? expandedState : true);

// Get group and member info
  useEffect(() => {
    if (token) {
      fetch(`/pubGroups/${pubGroupId}`, {
        method: 'get',
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setPubGroupData(data.pubGroup)
        })
      }
            if (!isLoggedIn) {navigate('/', { state: { expandedState: expanded } });;}
    }, [navigate, isLoggedIn, token]);


// Sorts through data received from DB to make them usable in frontend
        const members = pubGroupData?.members
        // checks to see whether the person who is logged in is in the group already - for join/leave button
        const memberIds = members?.map((member) => member._id) || [];
        let isGroupMember = (memberIds?.includes(getSessionUserID(token)))



// SF WORK - This finds just the  Bets
useEffect(() => {
    if(token) {
        fetch( '/wagers/groups/findgroupwagers', {
          method: 'post',
          headers: 
          {'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',},
          body: JSON.stringify({ArrayOfMembers:memberIds})
        })
        .then(response => response.json())
        .then(async data => {
            window.localStorage.setItem("token", data.token) 
            setToken(window.localStorage.getItem("token")) 
            console.log(data.wagers)
            setGroupWagers(data.wagers)
        })
    }
}, []);






        
// for NavBar:
const toggleExpand = () => {setExpanded(!expanded);};


const toggleGroupMembership = async () => {
    try {
        if (!isGroupMember) {
            const response = await fetch(`/pubGroups/${pubGroupId}/addMember`, {
                method: 'post',
                headers: {'Authorization': `Bearer ${token}`}
            });
            if (response.ok) {
                console.log("Member added successfully.");
                window.location.reload()
            } else {
                console.error("Failed to add member:", response.statusText);
            }
        } else {
            const response = await fetch(`/pubGroups/${pubGroupId}/removeMember`, {
                method: 'post',
                headers: {'Authorization': `Bearer ${token}`}
            });
            if (response.ok) {
                console.log("Member removed successfully.");
                navigate(`/groups`);
            } else {
                console.error("Failed to remove member:", response.statusText);            
                
            }

        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

return (

<div className='shade'>
<div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
<div className='blackboard'>
<VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
<BlackboardHeader expandedState={expanded}/> 

{/* Rebuild Below */}
<div className='chalktitle'>{pubGroupData?.name}</div>
    <div style={{backgroundColor:'red'}}>
        <button onClick={toggleGroupMembership} className='orange_Button'> {!isGroupMember ? 'Join':'Leave'} </button>
    </div>
    <div style={{display:'flex'}}>
    <div style={{backgroundColor:'GREEN',width:'50%'}}>
        <div id='TopStats' style={{backgroundColor:'white'}}>
            Information about Stats here   
        </div>
        <div id='UserBets'>
            <b>Members:</b>
            {members?.map((member) => <p key={member._id}>{member.username} - {member._id}</p>)}
            
            <b>Groups Wagers:</b>
            {groupWagers?.map((wager) => <p key={wager._id}>
            
            {/* TODO - Should change text based on win */}
            {/* TODO - Should Hyperlink to Bet Page */}
            {wager.peopleInvolved[0].username} bet {wager.peopleInvolved[1].username} that {wager.description} </p>
                            )}

        </div>
    </div>
    <div style={{backgroundColor:'BLUE',width:'50%'}}>LEADERBOARD POST IT HERE</div>
</div>



</div>
</div>
</div>




);
};
    
    export default SingleGroupPage;