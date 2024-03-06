import React, { useState } from 'react';
import { FaPencil } from "react-icons/fa6";


const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password, username: username, firstName: firstname, lastName: lastname  })
    })
    .then(async response => {
      if(response.status === 201) {
        navigate('/login', { state: { expandedState: expanded } });
      } else {
        const errorData = await response.json();
          navigate('/signup') 
          setErrorMsg(errorData.message)
          console.log(errorData.message)
      } 
    })
}
  
  const handleEmailChange = (event) => {setEmail(event.target.value)}
  const handleUsernameChange = (event) => {setUsername(event.target.value)}
  const handlePasswordChange = (event) => {setPassword(event.target.value)}
  const handleFirstNameChange = (event) => {setFirstname(event.target.value)}
  const handleLastNameChange = (event) => {setLastname(event.target.value)}
  
  
  return (
<form>
  <span className='chalk-error'>{errorMsg}</span>
  <div style={{ display: 'flex', marginBottom: '10px' }}>
    <div style={{ flex: '5%', justifyContent: 'flex-end' }}>
      <FaPencil style={{ transform: 'scaleX(-1)', color: 'whitesmoke', fontSize: '24px', marginRight:'4px',opacity:'0.2' }} />
    </div>
    <div style={{ flex: '95%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
      
    <input placeholder="Email" id="email" type='text' value={email} onChange={handleEmailChange} />
    <input placeholder="Username" id="username" type='text' value={username} onChange={handleUsernameChange} />
    <input placeholder="First Name" id="FirstName" type='text' value={firstname} onChange={handleFirstNameChange} />
    <input placeholder="Last Name" id="LasttName" type='text' value={lastname} onChange={handleLastNameChange} />
    <input placeholder="Password" id="password" type='password' value={password} onChange={handlePasswordChange} />
      
    </div>
  </div>
  <button className="orange_Button" onClick={handleSubmit} id='submit'>Submit</button>
</form>

      
    );}

export default SignUpForm;
