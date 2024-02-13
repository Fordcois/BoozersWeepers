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

  return (
    <div>
<div style={{display:'flex', flexWrap:'wrap'}}>
      {WalletData && WalletData.pints.length > 0 ? (
        WalletData.pints.map((pint) => (

          <div className='post-it' key={pint._id}>
            <div className="note">
            
               <span className='penfont-large' style={{color:'black',fontSize:'36px'}}>I.O.U.</span>
               <span className='penfont-large' style={{color:'black',fontSize:'24px'}}>A PINT</span>
               <span className='penfont-large' style={{color:'black',fontSize:'18px'}}>signed by:</span>
               <span className='penfont-large' style={{color:'#cd561b'}}>{pint.owed_by.username}</span>
               <button className="singlepint_Button">Claim</button>
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
