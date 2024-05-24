import React, { useEffect } from 'react';
import baseUrl from './baseurl';

// THIS PINGS THE SEVER TO WAKE IT UP AS IT IS HOSTED ON THE FREE TIER OF RENDER.COM
// BY SENDING A MEANINGLESS REQUEST UPON FRONTEND LOAD IT SHOULD MI

const ApiWakeup = () => {
  
    useEffect(() => {
    const PingAPI = async () => {
      try {
        const response = await fetch(`${baseUrl}/users`, 
        {method: 'GET',
         headers: {'Content-Type': 'application/json'}});
        if (!response.ok) {throw new Error('Network response was not ok');}
        } 
      catch (error) {console.error('Error pinging the server:', error);}
    };

    PingAPI();
  }, []); // Empty dependency array to run only once

  return (
    <></>
  );
};

export default ApiWakeup;