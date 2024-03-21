import VertNavbar from '../VertNavBar/VertNavBar';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import isTokenValid from '../Utility/isTokenValid';
import getSessionUserID from '../Utility/getSignedInUser_id';
import '../../Pages/style.css'
import BlackboardHeader from '../blackboardHeader/blackboardHeader';
import { useLocation } from 'react-router-dom';
import calculateGroupStats from './groupLeaderBoard';

const SingleGroupPage = ({ navigate }) => {
const { pubGroupId } = useParams();
const [pubGroupData, setPubGroupData] = useState(null);
const [token, setToken] = useState(window.localStorage.getItem("token"));
const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
const [hasJoinedGroup, setHasJoinedGroup] = useState(false);
const [hasLeftGroup, setHasLeftGroup] = useState(false);

const [groupWagers,setGroupWagers] = useState([]);
const [groupMembers,setGroupMembers] = useState([]);
const [groupLeaderboardData,setGroupLeaderboardData] = useState([])



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
        .then( data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setPubGroupData(data.pubGroup)
          
          // Return the data to chain the promises
          return data;
        })
        .then(data => {
          return fetch('/wagers/groups/findgroupwagers', {
              method: 'post',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ ArrayOfMembers: memberIds })
            })
            .then(response => response.json())
            .then(async data => {
              window.localStorage.setItem("token", data.token);
              setToken(window.localStorage.getItem("token"));
              console.log(data.wagers);
              setGroupWagers(data.wagers);
              setGroupLeaderboardData(calculateGroupStats(members, data.wagers));

            });
        })
        .catch(error => {
          // Handle errors if any
          console.error('Error:', error);
        });
    }

    if (!isLoggedIn) {
      navigate('/', { state: { expandedState: expanded } });
    }
}, [navigate, isLoggedIn, token]);


// Sorts through data received from DB to make them usable in frontend
        const members = pubGroupData?.members
        // checks to see whether the person who is logged in is in the group already - for join/leave button
        const memberIds = members?.map((member) => member._id) || [];
        let isGroupMember = (memberIds?.includes(getSessionUserID(token)));

        const sortedWinPercent = groupLeaderboardData.slice(0).sort((a, b) => b.winPercentage - a.winPercentage);
        // console.log("SORTED WIN PERCENT !!!!!!!!!!!!!!!!!!!")
        // console.log(sortedWinPercent)
        // const reversed = sortedWinPercent.reverse()
        // console.log(reversed);
        const sortedTotalWins = groupLeaderboardData.slice(0).sort((a, b) => b.betsWon - a.betsWon);
        const sortedTotalLosses = groupLeaderboardData.slice(0).sort((a, b) => b.betsLost - a.betsLost);
        const sortedWagersData = groupWagers.slice(0).sort((a, b) => new Date(b.datemade).getTime() - new Date(a.datemade).getTime());

        const totalPints = groupWagers.filter(wager => wager.winner).length;
        
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
    <div id='ButtonDiv'>
        <button onClick={toggleGroupMembership} className='orange_Button'> {!isGroupMember ? 'Join':'Leave'} </button>
    </div>
    <div style={{display:'flex'}}>
    <div style={{width:'50%'}}>
        <div id='TopStats'>
            <span className="orange-chalk">Biggest Boozer</span> <br/>
            <div className='small-chalk' style={{textAlign:'center',marginBottom:'0px'}}>{sortedTotalWins[0]?.username}</div>
            <span className="orange-chalk">Biggest Weeper</span> <br/>
            <div className='small-chalk' style={{textAlign:'center',marginBottom:'0px'}}> {sortedTotalLosses[0]?.username} </div>
            <span className="orange-chalk">Free Pints won in {pubGroupData?.name}</span> <br/>
            <div className='small-chalk' style={{textAlign:'center',marginBottom:'0px'}}> {totalPints}</div>
        </div>

        <div id='UserBets'>
            <div className="orange-chalk">Latest Wagers...</div>
            {/* Displays most recent 10 wagers in group */}
            {sortedWagersData.slice(0,10)?.map((wager) => (
            <div key={wager._id}>
            {wager.winner ? (wager.winner._id===wager.peopleInvolved[0]._id ? 
            // Winner & Person 0 is the Winner
            <div className='small-chalk'>{wager.peopleInvolved[0].username} won their wager with {wager.peopleInvolved[1].username} that {wager.description}</div> :
            // Winner & Person 1 is the winner
            <div className='small-chalk'>{wager.peopleInvolved[1].username} won their wager with {wager.peopleInvolved[0].username} that {wager.description}</div>)
            : 
            // No Winner            
            <div className='small-chalk'>
            {wager.peopleInvolved[0].username} bet {wager.peopleInvolved[1].username} that {wager.description}
            </div>
            }</div>

))}

        </div>
    </div>
    <div style={{backgroundColor:'BLUE',width:'50%'}}>


    
    {sortedWinPercent.map((item,index) => (
  <div key={item.id}>
    {index+1} - {item.username} - {item.winPercentage}%
  </div>
))}



        
    </div>
</div>



</div>
</div>
</div>




);
};
    
    export default SingleGroupPage;