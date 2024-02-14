import React, { useState } from 'react';
import { FaPencil } from "react-icons/fa6";

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({ email: email, password: password })
    })

    if(response.status === 201) {
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      navigate('/myAccount');
    } 
    else {
      const errorData = await response.json();
      navigate('/login') 
      setErrorMsg(errorData.message)
      }

  }

  const handleEmailChange = (event) => {setEmail(event.target.value)}
  const handlePasswordChange = (event) => {setPassword(event.target.value)}

    return (
<form>
  <span className='chalk-error'>{errorMsg}</span>
  <div style={{ display: 'flex', marginBottom: '10px'}}>
    <div style={{ flex: '5%', justifyContent: 'flex-end' }}>
      <FaPencil style={{ transform: 'scaleX(-1)', color: 'whitesmoke', fontSize: '24px', marginRight:'4px',opacity:'0.2' }} />
    </div>
    <div style={{ flex: '95%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
      
      <input placeholder='Email' id="email" type='text' value={email} onChange={handleEmailChange} /><br/>
      <input placeholder='Password' id="password" type='password' value={password} onChange={handlePasswordChange} /><br/>
      
    </div>
  </div>
  <button className="orange_Button" onClick={handleSubmit} id='submit'>Submit</button>
</form>

    );
}

export default LogInForm;
