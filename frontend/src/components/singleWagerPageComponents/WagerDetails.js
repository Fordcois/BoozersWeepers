import getSessionUserID from "../Utility/getSignedInUser_id";
import React, { navigate } from 'react';
import { useNavigate } from "react-router-dom";


const WagerDetails = (wagerData) => {
    const navigate = useNavigate()
    const wager = wagerData.wagerData;
    const challenger = wager.peopleInvolved[0]
    const challengedUser = wager.peopleInvolved[1]
    
return (
<div>

  <div style={{display: 'flex'}}>
      <div style={{flex: '20%', backgroundColor: 'transparent',display:'flex',alignItems: 'flex-start',justifyContent:'right'}}>
        <div className="wageruserportrait"><img src={challenger.profilepicurl} alt='user profile'/> </div>
      </div>
          
          <div style={{flex: '60%', backgroundColor: 'transparent',padding:'1%'}}>
              <span className="chalk" style={{ '--fsize': '24px', '--talign': 'left', color: '#cd561b' }}> {challenger.username}</span> 
              <span className="chalk" style={{ '--fsize': '34px', 'textDecoration': 'underline #cd561b', 'textDecorationThickness': '3px' }}> {challenger.firstName} {challenger.lastName}</span>
              
              <span className="chalk" style={{ '--fsize': '46px', '--talign': 'center', color: 'whitesmoke' }}> VS</span> 

              <span className="chalk" style={{ '--fsize': '34px','--talign': 'right', 'textDecoration': 'underline #cd561b', 'textDecorationThickness': '3px' }}> {challengedUser.firstName} {challengedUser.lastName}</span>
              <span className="chalk" style={{ '--fsize': '24px', '--talign': 'right', color: '#cd561b' }}> {challengedUser.username}</span> 
          </div>

      <div style={{flex: '20%', backgroundColor: 'transparent',display:'flex',alignItems: 'flex-end',justifyContent:'left'}}>
          <div className="wageruserportrait"><img src={challengedUser.profilepicurl} alt='user profile'/> </div>
      </div>
  </div>
 
  <span className="chalk" style={{ paddingLeft:'12%','--fsize': '24px', '--talign': 'left', color: '#cd561b'}}> {challenger.firstName} bet that... <br/> </span>
  <span className="chalk" style={{ marginTop:'1%',paddingLeft:'17%','--fsize': '20px', '--talign': 'left', color: 'whitesmoke' }}> {wager.description}</span>

 
 
 
 
 
 

 


</div>
    );
  };

export default WagerDetails;
