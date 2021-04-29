import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// const onLoggedIn = (authData) => {
//   setUser({
//     user: authData.user.Username
//   });

//   localStorage.setItem('token', authData.token);
//   localStorage.setItem('user', authData.user.Username);
//   console.log(authData.token)
// }

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => ( localStorage.getItem('token')
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

export default ProtectedRoute;