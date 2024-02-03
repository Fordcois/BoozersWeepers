import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import isTokenValid from '../components/Utility/isTokenValid';
import VertNavbar from '../components/VertNavBar/VertNavBar';
import '../Pages/style.css';
import BlackboardHeader from '../components/blackboardHeader/blackboardHeader';
import SingleUserStats from '../components/stats/getSingleUserStats';

const ProfilePage = () => {
  const { userID } = useParams();
  const [userToken, setUserToken] = useState(window.localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(userToken));
  const [expanded, setExpanded] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/userdata/${userID}`, {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const fetchedData = await response.json();

        window.localStorage.setItem('token', fetchedData.token);
        setUserToken(window.localStorage.getItem('token'));
        setUserData(fetchedData.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userToken, userID]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className='shade'>
      <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
        <div className='blackboard'>
          <div className='form'>
            <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
            <BlackboardHeader />
            
{userData ? (
<>
<div style={{ display: 'flex' }}>
  <div style={{ paddingRight: '5em'}}>
      <span className="chalk" style={{ '--fsize': '34px', '--talign': 'left', 'text-decoration': 'underline #cd561b', 'text-decoration-thickness': '3px' }}>{userData.username}</span>
      <span className="chalk" style={{ '--fsize': '24px', '--talign': 'left', color: '#cd561b' }}> {userData.firstName} {userData.lastName}</span>
      <div className="profilepageportrait"><img src={userData.profilepicurl} alt="User Avatar" /></div>
  </div>

  <div >
      <div className='post-it'>
      <p className="note"><SingleUserStats UserID={userID} /></p>
    
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to={{ pathname: `/newWager/${userData._id}`, state: 'hello' }}>
          <button className="orange_Button">Challenge</button>
        </Link>

      </div>
    </div>
  </div>

</div>
</>
                ) : (
              <div style={{ 'textAlign': 'center' }}>
                <span className="chalk" style={{ '--fsize': '34px' }}>No User Found</span>
                <span className="chalk" style={{ '--fsize': '28px', 'opacity': '0.8' }}>(Sorry!)</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
