import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import baseUrl from '../Utility/baseurl';
import './WalletComponent.css';

const WalletComponent = ({ UserID, expandedState }) => {
  const [WalletData, setWalletData] = useState(null);
  const [userToken] = useState(window.localStorage.getItem('token'));
  const [expanded] = useState(expandedState !== undefined ? expandedState : true);
  
  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const response = await fetch(`${baseUrl}/pints/wallet/${UserID}`, {headers: { Authorization: `Bearer ${userToken}` }});
        if (!response.ok) {throw new Error('Network response was not ok');}
        const fetchedData = await response.json();
        setWalletData(fetchedData);
          } 
      catch (error) {console.error('Error fetching pint data:', error);}
    };

    fetchWalletData();
  }, [UserID, userToken]);



  const claimPint = async (ID) => {
    const pintId=ID
    if (userToken) {
      try {
      await fetch(`${baseUrl}/pints/claim/${pintId}`, {
        method: 'post',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json' 
        }
      })
      .then(response => {
        if (response.status === 200) {
          console.log("Pint Claimed!");
          window.location.reload()
        } 
      })
      }
      catch(error) {console.error('Error claiming pint:', error);}
    }
  };



  return (
    <div>
<div style={{display:'flex', flexWrap:'wrap',justifyContent:'center'}}>
      {WalletData && WalletData.pints.length > 0 ? (
        WalletData.pints.map((pint) => (

          <div className='post-it' key={pint._id}>
            <div className="note">
            
              <span className='penfont-large' style={{color:'black',fontSize:'40px'}}>I.O.U.</span>
              <span className='penfont-large' style={{color:'black',fontSize:'24px',marginBottom:'11%'}}>ONE PINT</span>
              <span className='penfont-large' style={{color:'black',fontSize:'18px',marginBottom:'0'}}>SIGNED BY:</span>
              <span className='penfont-large' style={{marginTop:'-17px', color:'#cd561b',marginBottom:'13%',fontSize:'40px',textDecoration: 'underline dotted #e3e294'}}>{pint.owed_by.username}</span>

              <button className="orange_Button" style={{marginBottom:'2%'}} onClick={() => claimPint(pint._id)}>Claim</button>

            </div>
          </div>
        ))
      ) : (
    <div style={{textAlign:'center', height:'20vh'}}>
        <span className="chalk" style={{ marginTop:'5%','--fsize': '22px', color: '#cd561b'}}> No Pints in Wallet </span>
        <span className="chalk" style={{ marginTop:'1%','--fsize': '19px', color: 'whitesmoke' }}>(<Link to = "/newWager/" state = {{expandedState: expanded }} className="chalk-link">Challenge Somebody to Earn a Pint</Link>)</span>                       
    </div>

      )}
</div>
      

      
  </div>
  );
};

export default WalletComponent;
