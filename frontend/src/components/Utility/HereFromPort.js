import React from 'react';
import '../../Pages/style.css';
import { useLocation } from 'react-router-dom';

const HereFromPort = () => {
  // Address Needs to be /?refer=
  const referralSource = new URLSearchParams(useLocation().search).get('refer'); 

  // If one of your preapproved sources the message will display
  if (referralSource === 'linkedin' || referralSource === 'my portfolio') 
    {
    return (
      <div style={{ textAlign: 'center', borderTop: '2px solid whitesmoke' }}>
        <span className="chalk" style={{ '--fsize': '32px', '--talign': 'center' }}>
          Here from {referralSource}?
        </span>
        <p className='Chalk'>
          <span className="HereFromPort">
            You can check out the site without registering using the account:
            <br/>
          </span>
          <span className="HereFromPort">Email: </span>
          <span className="HereFromPortOrange">guest@boozersweepers.com</span>
          <br/>
          <span className="HereFromPort">Password: </span>
          <span className="HereFromPortOrange">guestpass123</span>
        </p>
      </div>
    );
    }
  
  // Return null or some default content if there is no referral source or it doesn't match
  return null;
};

export default HereFromPort;