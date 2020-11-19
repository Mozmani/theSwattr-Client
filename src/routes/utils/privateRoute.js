import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { TokenService } from 'src/services';

const PrivateRoute = ({ component, path, children }) => {
  const Component = component;

  return (
    <Route
      {...children}
      path={path}
      render={(routeProps) =>
        TokenService.hasAuthToken ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              // Pseudo-code, implement with idle services
              //pathname: Context.idle ? ROUTES.LOGIN : ROUTES.REGISTER,
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
