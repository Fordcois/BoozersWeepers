import React, { useEffect, useState } from 'react';
import baseUrl from './baseurl';
import '../../Pages/style.css';

// THIS PINGS THE SERVER TO WAKE IT UP AS IT IS HOSTED ON THE FREE TIER OF RENDER.COM
// BY SENDING A MEANINGLESS REQUEST UPON FRONTEND LOAD IT SHOULD MAKE IT RESPONSIVE

const ApiWakeup = () => {
  const [serverStatus, setServerStatus] = useState(null);

  useEffect(() => {
    const PingAPI = async () => {
      try {
        const response = await fetch(`${baseUrl}/users/isserverlive`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) { throw new Error('Network response was not ok'); }
        const data = await response.json();
        setServerStatus(data.serverLive);
      } catch (error) {
        console.error('Error pinging the server:', error);
        setServerStatus('Error pinging the server');
      }
    };
    PingAPI();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      {serverStatus === null && (
        <div>
          

          <div className='LoadingBox'>
            <span className='LoadingTitleWhite'> Just A moment!</span>
            <br/>
            This example page is hosted on the free tier of Render.com. The backend may spin down due to inactivity, so please wait while the server starts up.
            This may take a minute or so. <br /><br />

            <span className='LoadingFinalMessage'>This message will disappear once the server has fully loaded.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiWakeup;
