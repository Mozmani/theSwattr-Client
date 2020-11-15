import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// import { TokenService } from 'src/services';
// import { BugsContext } from 'src/context';

const PublicRoute = ({ component, path, children }) => {
  const Component = component;

  return (
    <Route
      {...children}
      path={path}
      render={(routeProps) =>
        // Pseudo-code, implement with token services
        /* TokenService.hasAuthToken() */ 1 === 0 + 1 ? (
          <Redirect
            to={{
              pathname: '/',
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
