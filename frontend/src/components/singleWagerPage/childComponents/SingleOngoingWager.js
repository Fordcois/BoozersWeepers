import getSessionUserID from "../../Utility/getSignedInUser_id";
import React, { navigate } from 'react';
import { useNavigate } from "react-router-dom";


const SingleOngoingWager = (wagerData) => {
    const navigate = useNavigate()
    const token = window.localStorage.getItem('token');
    const loggedInUser = getSessionUserID(token)
    const wager = wagerData.wagerData
    let ActiveUser;
    let OtherUser;
    let ViewerInvolvedInbet = false;
    
    if (loggedInUser === wager.peopleInvolved[0]._id) {
        ActiveUser = wager.peopleInvolved[0];
        OtherUser = wager.peopleInvolved[1];
        ViewerInvolvedInbet = true
    } else if (loggedInUser === wager.peopleInvolved[1]._id){
        ActiveUser = wager.peopleInvolved[1];
        OtherUser = wager.peopleInvolved[0];
        ViewerInvolvedInbet = true
    } 

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

    return (
      <div>
        ID: {OtherUser._id}
          {ViewerInvolvedInbet ? 
              new Date(wager.deadline) > new Date() ? 
              // Viewer Involved - Deadline Not Passed
              <>
                  <span className="chalk" style={{ marginTop: '1%', paddingLeft: '12%', '--fsize': '22px', '--talign': 'left', color: '#cd561b' }}> Will happen by...</span>
                  <span className="chalk" style={{ marginTop: '1%', paddingLeft: '17%', '--fsize': '19px', '--talign': 'left', color: 'whitesmoke' }}>{deadlineDate} </span> 

                  <span className="chalk" style={{ marginTop: '4%', '--fsize': '27px', '--talign': 'center', color: 'whitesmoke' }}>Throw in the towel early?</span>
                  <span className="chalk" style={{ marginTop: '1%', '--fsize': '19px', '--talign': 'center', color: 'whitesmoke', opacity: '0.8' }}>(Lost your bottle?)</span>
                  
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3%' }}>
                      <button id='accept-button' className='orange_Button' onClick={() => handleWinner(OtherUser._id, ActiveUser._id)}>Concede Wager</button>
                  </div>
              </>
              :
              // Viewer Involved - Deadline Passed
              <>
                  <span className="chalk" style={{ marginTop: '1%', paddingLeft: '12%', '--fsize': '22px', '--talign': 'left', color: '#cd561b' }}> Would happen by...</span>
                  <span className="chalk" style={{ marginTop: '1%', paddingLeft: '17%', '--fsize': '19px', '--talign': 'left', color: 'whitesmoke' }}>{deadlineDate} </span>  

                  <span className="chalk" style={{ marginTop: '4%', '--fsize': '27px', '--talign': 'center', color: 'whitesmoke' }}>So, Times up! Who won?</span>
                  <span className="chalk" style={{ marginTop: '1%', '--fsize': '19px', '--talign': 'center', color: 'whitesmoke', opacity: '0.8' }}>(Who's the real guv'nor round 'ere?)</span>
              
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3%' }}>
                      <button id='accept-button' className='orange_Button' style={{ marginRight: '7%' }} onClick={() => handleWinner(ActiveUser._id, OtherUser._id)}>I won</button>
                      <button id='reject-button' className='orange_Button' style={{ marginLeft: '7%' }} onClick={() => handleWinner(OtherUser._id, ActiveUser._id)}>{OtherUser.firstName} Won</button>
                  </div>
              </>
          :
          new Date(wager.deadline) > new Date() ?
          // Viewer Not Involved - Deadline Not Passed
          <div>
              <span className="chalk" style={{ marginTop: '1%', paddingLeft: '12%', '--fsize': '22px', '--talign': 'left', color: '#cd561b' }}> Would happen by...</span>
              <span className="chalk" style={{ marginTop: '1%', paddingLeft: '17%', '--fsize': '19px', '--talign': 'left', color: 'whitesmoke' }}>{deadlineDate} </span>  

              <span className="chalk" style={{ marginTop: '4%', '--fsize': '27px', '--talign': 'center', color: 'whitesmoke' }}>There's no Winner yet</span>
              <span className="chalk" style={{ marginTop: '1%', '--fsize': '19px', '--talign': 'center', color: 'whitesmoke', opacity: '0.8' }}>(Times ticking ...)</span>
          </div>
          :
          // Viewer Not Involved - Deadline Passed
          <div>
              <span className="chalk" style={{ marginTop: '1%', paddingLeft: '12%', '--fsize': '22px', '--talign': 'left', color: '#cd561b' }}> Would happen by...</span>
              <span className="chalk" style={{ marginTop: '1%', paddingLeft: '17%', '--fsize': '19px', '--talign': 'left', color: 'whitesmoke' }}>{deadlineDate} </span>  

              <span className="chalk" style={{ marginTop: '4%', '--fsize': '27px', '--talign': 'center', color: 'whitesmoke' }}>Times Up but they still haven't decided who won!</span>
              <span className="chalk" style={{ marginTop: '1%', '--fsize': '19px', '--talign': 'center', color: 'whitesmoke', opacity: '0.8' }}>(What a pair of muppets)</span>
          </div>
          }
      </div>
  );
};

export default SingleOngoingWager;