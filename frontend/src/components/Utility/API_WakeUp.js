import React, { useEffect, useState } from 'react';
import baseUrl from './baseurl';

// THIS PINGS THE SERVER TO WAKE IT UP AS IT IS HOSTED ON THE FREE TIER OF RENDER.COM
// BY SENDING A MEANINGLESS REQUEST UPON FRONTEND LOAD IT SHOULD MAKE IT RESPONSIVE

const ApiWakeup = () => {
  const [serverStatus, setServerStatus] = useState('Loading...');

  useEffect(() => {
    const PingAPI = async () => {
      try {
        const response = await fetch(`${baseUrl}/users/isserverlive`, 
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setServerStatus(data.serverLive)
      } catch (error) {
        console.error('Error pinging the server:', error);
        setServerStatus('Error pinging the server');
      }
    };

    PingAPI();
  }, []); // Empty dependency array to run only once

  return (
    <div style={{backgroundColor:'red',color:'white'}}>{serverStatus}</div>
  );
};

export default ApiWakeup;
