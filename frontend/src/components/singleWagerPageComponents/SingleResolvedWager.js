import getSessionUserID from '../Utility/getSignedInUser_id';
import React from 'react';

const SingleResolvedWager = (wagerData) => {
  const loggedInUser = getSessionUserID(window.localStorage.getItem('token'));
  const wager = wagerData.wagerData;
  const winner = wager.winner;
  const loser = wager.peopleInvolved.find(person => person._id !== wager.winner._id);
  const dateParts = wager.deadline.slice(0, 10).split("-");
  const deadlineDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`

  return (
    <div id='resolved-wager-information' className='preamble'>
      <span className="chalk" style={{ marginTop: '1%', paddingLeft: '12%', '--fsize': '22px', '--talign': 'left', color: '#cd561b' }}> Would have happened by...</span>
      <span className="chalk" style={{ marginTop: '1%', paddingLeft: '17%', '--fsize': '19px', '--talign': 'left', color: 'whitesmoke' }}>{deadlineDate} </span>
      <span className="chalk" style={{ marginTop: '4%', '--fsize': '27px', '--talign': 'center', color: 'whitesmoke' }}>{winner.username} Wins</span>

      {loggedInUser === winner._id && (
        <span className="chalk" style={{ marginTop: '1%', '--fsize': '19px', '--talign': 'center', color: 'whitesmoke', opacity: '0.8' }}>(Get in!)</span>
      )}

      {loggedInUser === loser._id && (
        <span className="chalk" style={{ marginTop: '1%', '--fsize': '19px', '--talign': 'center', color: 'whitesmoke', opacity: '0.8' }}>(Next rounds on you)</span>
      )}

      {loggedInUser !== winner._id && loggedInUser !== loser._id && (
        <span className="chalk" style={{ marginTop: '1%', '--fsize': '19px', '--talign': 'center', color: 'whitesmoke', opacity: '0.8' }}>(Just another day at the office for {winner.username})</span>
      )}
    </div>
  );
};

export default SingleResolvedWager;