import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import PageLayout from '../components/PageLayout/PageLayout';
import isTokenValid from '../components/Utility/isTokenValid';
import getSessionUserID from '../components/Utility/getSignedInUser_id';
import calculateGroupStats from '../components/groupLeaderboard/groupLeaderBoard';
import baseUrl from '../components/Utility/baseurl';
import '../Pages/style.css'

const SingleGroupPage = ({ navigate }) => {
const { pubGroupId } = useParams();
const [pubGroupData, setPubGroupData] = useState(null);
const [token, setToken] = useState(window.localStorage.getItem("token"));
const [isLoggedIn] = useState(isTokenValid(token));

const [groupWagers,setGroupWagers] = useState([]);
const [groupLeaderboardData,setGroupLeaderboardData] = useState([])

const location = useLocation();
const [expanded, setExpanded] = useState(location.state?.expandedState ?? true);


useEffect(() => {

  if (!isLoggedIn) {
    navigate('/', { state: { expandedState: expanded } });
  }

  if (token) {

    // Get group and group member info
    fetch(`${baseUrl}/pubGroups/${pubGroupId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => response.json())
      .then( data => {
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
        setPubGroupData(data.pubGroup)
      })

      // Get wager info for members of group, following on from above fetch
      .then( async () => {
        const response = await fetch(`${baseUrl}/wagers/groups/findgroupwagers`, {
          method: 'post',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ArrayOfMembers: memberIds })
        });
        const data = await response.json();
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        setGroupWagers(data.wagers);
        setGroupLeaderboardData(calculateGroupStats(members, data.wagers));
      })
      
      .catch(error => {
        console.error('Error:', error);
      });
  }
}, [navigate, isLoggedIn, token]);


// Sorts through data received from DB to make them usable in frontend
const members = pubGroupData?.members
// checks to see whether the person who is logged in is in the group already - for join/leave button
const memberIds = members?.map((member) => member._id) || [];
let isGroupMember = (memberIds?.includes(getSessionUserID(token)));

const sortedWinPercent = groupLeaderboardData.slice(0).sort((a, b) => b.winPercentage - a.winPercentage);

const sortedTotalWins = groupLeaderboardData.slice(0).sort((a, b) => b.betsWon - a.betsWon);
const mostTotalWinsUsername = sortedTotalWins[0]?.betsWon !== 0 ? sortedTotalWins[0]?.username : 'No winners yet!'

const sortedTotalLosses = groupLeaderboardData.slice(0).sort((a, b) => b.betsLost - a.betsLost);
const mostTotallossesUsername = sortedTotalLosses[0]?.betsLost !== 0 ? sortedTotalLosses[0]?.username : 'No Losers yet!'
const sortedWagersData = groupWagers.slice(0).sort((a, b) => new Date(b.datemade).getTime() - new Date(a.datemade).getTime());

const totalPints = groupWagers.filter(wager => wager.winner).length;

const OnlyOneMember= sortedWinPercent.length === 1
const AllMembersOnZeroPercent = sortedWinPercent.every(obj => obj.winPercentage === '0.00')

const toggleGroupMembership = async () => {
  try {
    if (!isGroupMember) {
      const response = await fetch(`${baseUrl}/pubGroups/${pubGroupId}/addMember`, {
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
      const response = await fetch(`${baseUrl}/pubGroups/${pubGroupId}/removeMember`, {
          method: 'post',
          headers: {'Authorization': `Bearer ${token}`}
      });
      if (response.ok) {
        if (pubGroupData.members.length === 1) {
          const response = await fetch(`${baseUrl}/pubGroups/${pubGroupId}/deleteGroup`, {
            method: 'post',
            headers: {'Authorization': `Bearer ${token}`}
          });
          if (response.ok) {
              console.log("Group deleted successfully as no members in group.");
              
          } else {
              console.error("Failed to delete group:", response.statusText);
          }
          navigate(`/groups`);
        }
      } else {
        console.error("Failed to remove member:", response.statusText);            
      }
    }
  } catch (error) {
      console.error("An error occurred:", error);
  }
}

return (

  <PageLayout expanded={expanded} setExpanded={setExpanded}>



      <div className='chalktitle'>{pubGroupData?.name}</div>
      <div id='ButtonDiv'>
        <button onClick={toggleGroupMembership} className='orange_Button'> {!isGroupMember ? 'Join':'Leave'} </button>
      </div>
      <div style={{display:'flex'}}>
        <div style={{width:'50%'}}>
          <div id='TopStats'>
            <span className="orange-chalk">Biggest Boozer</span> <br/>
            <div className='small-chalk' style={{textAlign:'center',marginBottom:'0px'}}>
              {mostTotalWinsUsername}
            </div>
            <span className="orange-chalk">Biggest Weeper</span> <br/>
            <div className='small-chalk' style={{textAlign:'center',marginBottom:'0px'}}> {mostTotallossesUsername} </div>
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
              }
            </div>
            ))}
          </div>
        </div>

        <div className='post-it' style={{width:'50%'}}>
          <p className="note" style={{width:'90%'}}>
            <span className="penfont-large centered">Leaderboard</span>
            {OnlyOneMember || AllMembersOnZeroPercent ? (
            <div style={{textAlign:'center'}} className="penfont-small">
              Resolve a wager with other members to climb the Leaderboard
            </div>
            ) : (
            sortedWinPercent.map((item, index) => (
            <div key={item.id}>
              <span className="penfont-small">{index + 1} {item.username} - {item.winPercentage}%</span>
            </div>
            ))
            )}

          </p>
        </div>
      </div>

</PageLayout>

)};
    
    export default SingleGroupPage;