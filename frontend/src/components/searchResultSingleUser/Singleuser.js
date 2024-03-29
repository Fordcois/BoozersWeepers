import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './userlist.css';

const SingleUser = ({ SelectedUser, key, expandedState }) => {
  const [expanded, setExpanded] = useState(expandedState !== undefined ? expandedState : true);

  useEffect(() => {
    setExpanded(expandedState);
  }, [expandedState]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const navigate = useNavigate();
  


return (
<Link to={`/profile/${SelectedUser._id}`} state={{expandedState: expanded}} style={{ textDecoration: 'none', color: 'inherit' }}>
  <div className='singleuser'>

    <div style={{ display: 'flex', marginBottom: '10px' }}>

      <div style={{ flex: '5%', justifyContent: 'flex-end', paddingRight: '10px' }}>
            <img src={SelectedUser.profilepicurl} className='profilepic' alt='user profile'/>
      </div>

      <div style={{ flex: '95%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <span className='SingleUserNameText'><b>{SelectedUser.username} {expanded}</b></span> 
            <span className='RealNameText'>
              {SelectedUser.firstName !== '' || SelectedUser.lastName !== '' ? 
                `(${capitalizeFirstLetter(SelectedUser.firstName)} ${capitalizeFirstLetter(SelectedUser.lastName)})` : null}
            </span>   
      </div>

    </div> 
  </div>
</Link>
  );
};

export default SingleUser;
