import VertNavbar from "../VertNavBar/VertNavBar";
import isTokenValid from '../Utility/isTokenValid';
import React, { useEffect, useState } from 'react';
import getSessionUserID from '../Utility/getSignedInUser_id';
import '../../Pages/style.css'
import BlackboardHeader from "../blackboardHeader/blackboardHeader";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NewGroupPage from "../newGroupPage/NewGroupPage";
import NewSearchBar from "../NewSearch/NewSearch";

const PubGroupsPage = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [pubGroups, setPubGroups] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
  const location = useLocation();
  const expandedState = location.state?.expandedState;
  const [expanded, setExpanded] = useState(expandedState !== undefined ? expandedState : true);
  const [groupCreated, setGroupCreated] = useState(0);


  const toggleExpand = () => {setExpanded(!expanded);};

  const handleGroupCreatedState = () => {
    console.log(groupCreated)
    setGroupCreated(groupCreated + 1);
  }
  console.log(groupCreated)


    useEffect(() => {
    
    // Gets pub groups data from backend
    if(token) {
      fetch("/pubGroups", {
        method: 'get',
        headers: {'Authorization': `Bearer ${token}`}
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setPubGroups(data.pubGroups)
        })
      }
            if (!isLoggedIn) {navigate('/', { state: { expandedState: expanded } });;}
    }, [navigate, isLoggedIn, token, groupCreated]);

        // Gets a list of the groups which the logged-in user is a member of
        const joinedGroups = pubGroups.filter(pubGroup => pubGroup.members.includes(getSessionUserID(token)))
        console.log(joinedGroups)


return (
<div className='shade'>
  <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
    <div className='blackboard'>
      <div className='form'>
        <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
        <BlackboardHeader expandedState={expanded}/> 

        <div style={{display:'flex'}}>
      
      <div id='left' className='post-it' style={{width:'50%'}}>
        <p className="note" style={{width:'90%'}}> 
          <span className="penfont-large centered">My Groups</span>
              
              {joinedGroups.map((pubGroup) => (
                <p key={pubGroup.id} className="group-name">
                  <Link className='groupListLink' to={`/groups/${pubGroup._id}`} state = {{expandedState: expanded }}>
                  {'>'} <span className="myGroupsInList">{pubGroup.name}</span>
                  </Link>
                </p>
                                              ))
              }
        </p>



      </div>
      <div style={{width:'50%',padding:'50px 20px',marginLeft:'20px'}}>
        
      <div className="orange-chalk" style={{marginBottom:'5px'}}> Create New Group</div>
      <div style={{marginLeft:'5px'}}><NewGroupPage navigate={navigate} change = {handleGroupCreatedState}/></div>

      <div className="orange-chalk" style={{paddingTop: '25px',marginBottom:'5px'}}> Search all groups</div>
      <div style={{marginLeft: '5px'}}><NewSearchBar searchData={pubGroups} expandedState ={expanded} searchMode={'groups'}/></div> 






                

            


      </div>
    </div>




      </div>
    </div>
  </div>
</div>
  )
}

export default PubGroupsPage;









            

          
        
          
          



