import React, { useEffect, useState } from 'react';
import PintInfo from '../singlepint/pintinfo';
import './popup.css';
import './WalletComponent.css';

const WalletComponent = ({ UserID }) => {
  const [WalletData, setWalletData] = useState(null);
  const [userToken, setUserToken] = useState(window.localStorage.getItem('token'));
  const [selectedPint, setSelectedPint] = useState(null); // State to track selected pint

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const response = await fetch(`/pints/wallet/${UserID}`, {headers: { Authorization: `Bearer ${userToken}` }});
        if (!response.ok) {throw new Error('Network response was not ok');}
        const fetchedData = await response.json();
        setWalletData(fetchedData);
          } 
      catch (error) {console.error('Error fetching pint data:', error);}
    };

    fetchWalletData();
  }, [UserID, userToken]);

  const openPintInfo = (pintId) => {
    setSelectedPint(pintId); // Set the selected pint to display its info
  };

  const closePintInfo = () => {
    setSelectedPint(null); // Clear the selected pint to close the pop-up
  };

  const claimPint = (ID) => {
    const pintId=ID
    if (userToken) {
      fetch(`/pints/claim/${pintId}`, {
        method: 'post',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json' 
        }
      })
      .then(response => {
        if (response.status === 200) {console.log("Pint Claimed!");} 
        else {console.log("Pint failed to be Claimed.");}
      })
      .catch(error => {console.error('Error claiming pint:', error);})
      .finally(() => {
        window.location.reload();
      });
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
        <span className="chalk" style={{ marginTop:'5%','--fsize': '22px', color: '#cd561b'}}> No Pints in Wallet</span>
        <span className="chalk" style={{ marginTop:'1%','--fsize': '19px', color: 'whitesmoke' }}>(<a className="chalk-link" href={`/newWager/`}>Challenge Somebody to Earn a Pint</a>)</span>                       
    </div>

      )}
</div>
      
      {/* Pop-up window */}
      {selectedPint && (
        <div className="popup">
          <div className="popup_inner">
            <span className="close_popup" onClick={closePintInfo}>
              &times;
            </span>
            <PintInfo pintId={selectedPint} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletComponent;
