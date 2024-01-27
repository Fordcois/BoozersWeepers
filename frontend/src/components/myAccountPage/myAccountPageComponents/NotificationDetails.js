
import React, { useEffect, useState } from 'react';
import './notification.css'

const NotificationDetails = (props) =>{
  const [userData, setUserData] = useState(null)
  const [token, setToken] = useState(window.localStorage.getItem("token"));


  //this component takes a given userId and popoulates the page with the User Data
  // It also takes a message prop to allow custom messages to be displayed



  
  useEffect(() => {
    if (token) {
      fetch(`/userData/${props.userId}`, {headers: {'Authorization': `Bearer ${token}`}})
      .then(response => response.json())
      .then(async userData => {
        window.localStorage.setItem("token", userData.token);
        setToken(window.localStorage.getItem("token"));
        setUserData(userData.user);})
      .catch(error => {console.error('Error fetching user data:', error);});
    }
  }, []);
return(
  
<div>
  {userData && (
    <h4 className='notificationdetails'>{props.messageBeforeName} {userData.username} {props.messageAfterName}</h4>
  )}
  </div>
)}


export default NotificationDetails;