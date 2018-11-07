import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import authentication from '../../api/authentication.js';

const PrivateRoute = ({ component: Component, ...rest }) => {

  const isLoggedIn = authentication.isAuthenticated();

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={
                        { pathname: '/login', state: { from: props.location } }
                       }
          />
        )
      }
    />
  )
}

export default PrivateRoute