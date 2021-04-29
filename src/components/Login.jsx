import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import styled from 'styled-components';

const Loginform = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30em;
`

const H1log = styled.h1`
  display: flex;
  justify-content: center;
  margin: 1em;
`
const Login = () => {

  let history = useHistory();

  const [user, setUser] = useState(null)
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3002/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      console.log('onLoggedIn')
      onLoggedIn(data);

    })
  .catch(e => {
    console.log(e, 'no such user')
  });
};

const onLoggedIn = (authData) => {
  setUser({
    user: authData.user.Username
  });

  localStorage.setItem('token', authData.token);
  localStorage.setItem('user', authData.user.Username);
  console.log(authData.token)
}

useEffect(() => {
  if (user) {
    history.push('/admin');
  }
},[user,history])

return(
  <div className="login-wrapper">
  <H1log>Please Log In</H1log>
  <Loginform onSubmit={handleSubmit}>
    <label>
      <p>Username</p>
      <input type="text" onChange={e => setUsername(e.target.value)}/>
    </label>
    <label>
      <p>Password</p>
      <input type="password" onChange={e => setPassword(e.target.value)}/>
    </label>
    <div>
      <button type="submit">Submit</button>
    </div>
  </Loginform>
</div>
)
}

export default Login;