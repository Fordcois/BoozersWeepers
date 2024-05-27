import React from 'react';
import '../../Pages/style.css';

const HereFromPort = () => {
  return (
    <div style={{ textAlign: 'center' }}>
        <span className='LoadingTitleWhite' style={{textAlign:'center'}}>Here from my Portfolio?</span>
        <p className='Chalk'>
        <span className="HereFromPort">
        You can check out the site without registering using the account:<br/></span>
        <span className="HereFromPort">Email: </span><span className="HereFromPortOrange"> guest@boozersweepers.com</span><br/>
        <span className="HereFromPort">Password: </span><span className="HereFromPortOrange">guestpass123</span></p>
    </div>
  );
};

export default HereFromPort;
