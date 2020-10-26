import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { useAuth } from "./context/Auth";

function PrivateRoute({ component: Component, ...rest }) {
    const isAuthenticated = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default PrivateRoute;