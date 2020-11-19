import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { TokenService } from 'src/services';

const PublicRoute = ({ component, path, children }) => {
  const Component = component;
  const loggedIn = TokenService.hasAuthToken();

  return (
    <Route
      {...children}
      path={path}
      render={(routeProps) =>
        loggedIn ? (
          <Redirect
            to={{
              pathname: path,
              state: { from: routeProps.location },
            }}
          />
        ) : (
          <Component {...routeProps} />
        )
      }
    />
  );
};

export default PublicRoute;
