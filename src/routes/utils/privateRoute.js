import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { UserContext } from 'src/context';

const PrivateRoute = ({ component, path, children }) => {
  const Component = component;
  const { userData } = React.useContext(UserContext);

  return (
    <Route
      {...children}
      path={path}
      render={(routeProps) =>
        userData.userName ? (
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
