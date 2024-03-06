import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SingleWagerRequest = ({ wagerData, expandedState }) => {
  const navigate = useNavigate();
  const token = window.localStorage.getItem('token');
  const wager = wagerData;
  const dateParts = wager.deadline.slice(0, 10).split("-");
  const deadlineDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
  const [expanded, setExpanded] = useState(expandedState !== undefined ? expandedState : true);

  useEffect(() => {
    setExpanded(expandedState);
  }, [expandedState]);

  const handleAcceptClick = () => {
    if(token) {
      fetch(`/wagers/${wager._id}/accept`, {
        method: 'post',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })      
      .then(response => {
        if (response.status === 200) {
          console.log("Wager Accepted");
          return response.json();
        } else {
          console.log("Wager failed to update");
        }
      });
      navigate("/myAccount", { state: { expandedState: expanded } } );
    }
  };

  const handleRejectClick = () => {
    fetch(`/wagers/${wager._id}/cancel`, {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });      
    navigate("/myAccount", { state: { expandedState: expanded } } );
  };

  return (
    <div id='single-wager-request' className='preamble'>
      {expandedState.toString()}

      <span className="chalk" style={{ marginTop:'1%',paddingLeft:'12%','--fsize': '22px', '--talign': 'left', color: '#cd561b'}}> Will happen by...</span>
      <span className="chalk" style={{ marginTop:'1%', paddingLeft:'17%','--fsize': '19px', '--talign': 'left', color: 'whitesmoke' }}>{deadlineDate} </span>

      <span className="chalk" style={{ marginTop:'4%','--fsize': '27px', '--talign': 'center', color: 'whitesmoke' }}>Do you accept the challenge?</span>
      <span className="chalk" style={{ marginTop:'1%','--fsize': '19px', '--talign': 'center', color: 'whitesmoke', opacity:'0.8' }}>(I fancy your chances)</span>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:'3%'}}>
        <button id='accept-button' className='orange_Button' style={{marginRight:'7%'}} onClick={ handleAcceptClick }>Accept Wager</button>
        <button id='reject-button' className='orange_Button' style={{marginLeft:'7%'}}onClick={ handleRejectClick }>Reject Wager</button>
      </div>
    </div>
  );
};

export default SingleWagerRequest;
