import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import isTokenValid from '../components/Utility/isTokenValid';
import VertNavbar from '../components/VertNavBar/VertNavBar';
import '../Pages/style.css';
import BlackboardHeader from '../components/blackboardHeader/blackboardHeader';

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
              <div style={{ backgroundColor: 'red' }}>
      
              </div>

                <div style={{ display: 'flex' }}>
                <div style={{ flex: '47%', backgroundColor: 'transparent' }}>
                  <span className="chalk" style={{ '--fsize': '34px', '--talign': 'left','text-decoration': 'underline #cd561b', 'text-decoration-thickness': '3px' }}>{userData.username}</span>
                  <span className="chalk" style={{ '--fsize': '24px', '--talign': 'left', color: '#cd561b'}}> {userData.firstName} {userData.lastName}</span>
                    <div class="profilepageportrait">
                      <img src={userData.profilepicurl} alt="User Avatar" />
                    </div>

                </div>
                
                
                
                
                
                
                
                <div style={{ flex: '53%', backgroundColor: 'transparent' }}>
                        <div style={{ backgroundColor: 'transparent', 'text-align': 'right', marginRight:'25px' }}><button className="orange_Button" >Challenge</button></div>
                        
                        <div style={{ backgroundColor: 'transparent' }}><div className='post-it'>
                  <p className="note">
                    Username: {userData.username}<br />
                    First Name: {userData.firstName}<br />
                    Last Name: {userData.lastName}<br />
                    Email: {userData.email}<br />
                  </p>
                </div></div>
                
                
                
                
                </div>
                </div>







                
  
                
              </>
            ) : (
              <p>User Not Found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
