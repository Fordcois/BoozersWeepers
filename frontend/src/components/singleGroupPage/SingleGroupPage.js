import VertNavbar from '../VertNavBar/VertNavBar';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import isTokenValid from '../Utility/isTokenValid';
import getSessionUserID from '../Utility/getSignedInUser_id';
import '../../Pages/style.css'
import BlackboardHeader from '../blackboardHeader/blackboardHeader';

const SingleGroupPage = ({ navigate }) => {
const { pubGroupId } = useParams();
const [pubGroupData, setPubGroupData] = useState(null);
const [wagers, setWagers] = useState([]);
const [token, setToken] = useState(window.localStorage.getItem("token"));
const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
const [expanded, setExpanded] = useState(true);
const [hasJoinedGroup, setHasJoinedGroup] = useState(false);
const [hasLeftGroup, setHasLeftGroup] = useState(false);

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
            if (!isLoggedIn) {navigate('/');}
    }, [navigate, isLoggedIn, token]);

// Gets all wager info with username and _id of people involved
        useEffect(() => {
            if(token) {
                fetch("/wagers", {
                    method: 'get',
                    headers: {'Authorization': `Bearer ${token}`}
                })
                    .then(response => response.json())
                    .then(async data => {
                        window.localStorage.setItem("token", data.token)
                        setToken(window.localStorage.getItem("token"))
                        setWagers(data.wagers)
                    })
                }
            if (!isLoggedIn) {navigate('/');}
            }, [navigate, isLoggedIn, token]);

// Sorts through data received from DB to make them usable in frontend
        const members = pubGroupData?.members
        const allMemberIds = members?.map((member) => member._id) || [];
        const allGroupWagers = wagers.filter((wager) => allMemberIds.includes(wager.peopleInvolved[0]._id) && allMemberIds.includes(wager.peopleInvolved[1]._id))
        // For winners and losers:
        const resolvedGroupWagers = allGroupWagers.filter(wager => wager.winner != null)
        const checkIfOngoing = (deadline) => {
            return new Date(deadline) > new Date()
        }
        // For ongoing wagers:
        const ongoingGroupWagers = allGroupWagers.filter(wager => wager.approved === true && checkIfOngoing(wager.deadline) && wager.winner === null)
        
        // checks to see whether the person who is logged in is in the group already - for join/leave button
        const memberIds = members?.map((member) => member._id) || [];
        let isGroupMember = (memberIds?.includes(getSessionUserID(token)))
        
// for NavBar:
const toggleExpand = () => {setExpanded(!expanded);};


const toggleGroupMembership = () => {
    if (!isGroupMember) {
        fetch(`/pubGroups/${pubGroupId}/addMember`, {
            method: 'post',
            headers: {'Authorization': `Bearer ${token}`}
        })
        window.location.reload();
        }
    else {
        fetch(`/pubGroups/${pubGroupId}/removeMember`, {
            method: 'post',
            headers: {'Authorization': `Bearer ${token}`}
        })
        navigate(`/groups`)
    }
}

return (

<div className='shade'>
<div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
<div className='blackboard'>
<VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
<BlackboardHeader /> 



{/* Column 2 */}
<div className="column">
{isGroupMember ? (
<div id='members-only-section'>
<div className='list-of-ongoing-wagers'>
<h2 id='ongoing-group-wagers' className='page_subheading'> Ongoing wagers</h2>
<ul>

</ul>
</div>
</div>
) : (
<p id='non-member-message' className='non-member'>You need to be a member of this group to see information</p>
)}
</div>

{/* Column 3 */}
<div className="column">
{isGroupMember && (
<div className='list-of-wins-losses'>
<h2 id='wins-and-losses' className='page_subheading'>Wins and losses</h2>

</div>
)}


</div>
</div>

{/* Rebuild Below */}
<div className='chalktitle'>{pubGroupData?.name}</div>
    <div style={{backgroundColor:'red'}}>
        <button onClick={toggleGroupMembership} className='orange_Button'> {!isGroupMember ? 'Join':'Leave'} </button>
    </div>
    <div style={{display:'flex'}}>
    <div style={{backgroundColor:'GREEN',width:'50%'}}>
        <div id='TopStats' style={{backgroundColor:'white'}}>
            Infomration about Stats here   
        </div>
        <div id='UserBets'>
        <strong>Resolved Wagers</strong><br/>
            {resolvedGroupWagers.map((wager) => 
            <span>
                {wager.peopleInvolved[0].username} bet {wager.peopleInvolved[1].username} that {wager.description}<br/>
            </span>)}

            <strong>Ongoing Wager</strong><br/>
            {ongoingGroupWagers.map((wager) => 
            <span>
                {wager.peopleInvolved[0].username} bet {wager.peopleInvolved[1].username} that {wager.description}<br/>
            </span>)}

        </div>

    </div>
    <div style={{backgroundColor:'BLUE',width:'50%'}}>LEADERBOARD POST IT HERE</div>
</div>


</div>
</div>




);
};
    
    export default SingleGroupPage;