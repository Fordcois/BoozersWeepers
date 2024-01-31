import React, { useState } from 'react';
import { FaPencil } from "react-icons/fa6";

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({ email: email, password: password })
    })

    if(response.status !== 201) 
      {navigate('/login')} 
    else {
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      navigate('/myAccount');
      }
  }

  const handleEmailChange = (event) => {setEmail(event.target.value)}

  const handlePasswordChange = (event) => {setPassword(event.target.value)}

    return (
<form>
<FaPencil style={{transform: 'scaleX(-1)', color: 'whitesmoke', fontSize: '24px'}} />
    <input placeholder='Email' id="email" type='text' value={email} onChange={handleEmailChange} /><br/>
<FaPencil style={{transform: 'scaleX(-1)', color: 'whitesmoke', fontSize: '24px'}} />
    <input placeholder='Password' id="password" type='password' value={password} onChange={handlePasswordChange} /><br/>
<button className="orange_Button" onClick={handleSubmit} id='submit'>Submit</button>
</form>
    );
}

export default LogInForm;
