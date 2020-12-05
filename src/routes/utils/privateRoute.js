import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { TokenService } from 'src/services';

//custom private route
const PrivateRoute = ({ component, path }) => {
  const Component = component;

  return (
    <Route
      path={path}
      render={(routeProps) =>
        TokenService.parseAuthToken() ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
