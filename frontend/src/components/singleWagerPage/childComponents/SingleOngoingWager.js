import getSessionUserID from "../../Utility/getSignedInUser_id";
import React, { navigate } from 'react';
import { useNavigate } from "react-router-dom";


const SingleOngoingWager = (wagerData) => {
    const navigate = useNavigate()
    const token = window.localStorage.getItem('token');
    const loggedInUser = getSessionUserID(token)
    const wager = wagerData.wagerData
    const user1 = wager.peopleInvolved[0]
    const user2 = wager.peopleInvolved[1]

    const dateParts = wager.deadline.slice(0, 10).split("-");
    const deadlineDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`

    const handleWinner = (WinnerID,LoserID) => {
      if (token) {
        fetch(`/wagers/updateWinner/${wager._id}/${WinnerID}`, {
          method: 'post',
          headers: {'Authorization': `Bearer ${token}`,}
        })
          .then(response => {
            if (response.status === 200) {
              console.log(`Wager winner updated to ${WinnerID}`)
              return response.json();
            } else {console.log("Wager winner failed to be updated")}
          })
          .then(() => {
            return fetch('/pints', {
              method: 'post',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                owner: WinnerID,
                owed_by: LoserID,
                bet: wager._id
              })
            })
          })
          .then(response => {
            if (response.status === 201) {
              console.log(`A Pint for ${WinnerID} has been created`);
              return response.json();
            } else {console.log("Failed to create a pint");}
          })
          .then(() => {
            navigate("/myAccount");
          })
          .catch(error => {
            console.error("Error occurred:", error);
          });
      }
    };


  return(
  <div>
    <span className="chalk" style={{ marginTop:'1%',paddingLeft:'12%','--fsize': '22px', '--talign': 'left', color: '#cd561b'}}> Will happen by...</span>
    <span className="chalk" style={{ marginTop:'1%', paddingLeft:'17%','--fsize': '19px', '--talign': 'left', color: 'whitesmoke' }}>{deadlineDate} </span>

  
      {/* Deadline is: {new Date(wager.deadline)}<br/>
      Now is: {new Date()} <br/> */}


    {new Date(wager.deadline) > new Date() ? 'Deadline Not Passed' : 'Deadline Passed'}
      
    <span className="chalk" style={{ marginTop:'4%','--fsize': '27px', '--talign': 'center', color: 'whitesmoke' }}>Do you accept the challenge?</span>
    <span className="chalk" style={{ marginTop:'1%','--fsize': '19px', '--talign': 'center', color: 'whitesmoke', opacity:'0.8' }}>(I fancy your chances)</span>

    {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:'3%'}}>
      <button id='accept-button' className='orange_Button' style={{marginRight:'7%'}} onClick={ handleAcceptClick }>Accept Wager</button>
      <button id='reject-button' className='orange_Button' style={{marginLeft:'7%'}}onClick={ handleRejectClick }>Reject Wager</button>
    </div> */}


  </div>)
  //   if (user1._id === loggedInUser) {
  //     return (
  //       <div className="preamble">
  //         You bet {user2.username} that {wager.description} would happen before {deadlineDate} <br />
  //         So...Who won?
  //         <br/>
  //         <button onClick={() => handleWinner(user1._id, user2._id)}>I Won</button><span className="button-space"></span>
  //         <button onClick={() => handleWinner(user2._id, user1._id)}>{user2.username} won</button>

  //       </div>
  //     );
  // } else if (user2._id === loggedInUser) {
  //     return (
  //       <div className="preamble">
  //       {user1.username} bet you that {wager.description} would happen before {deadlineDate}  <br /><br />
  //       So...   Who won?
  //       <br/>
  //       <br/>
  //       <button onClick={() => handleWinner(user2._id, user1._id)}>I Won</button><span className="button-space"></span>
  //       <button onClick={() => handleWinner(user1._id, user2._id)}>{user1.username} Won</button>
        

  //       </div>
  //     );
  // } else { 
  //   return (
  //   <div>
  //   You Are Not Involved in this bet!
  // </div>)}
};

export default SingleOngoingWager;
