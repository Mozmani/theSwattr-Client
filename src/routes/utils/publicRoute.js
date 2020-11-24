import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { UserContext } from 'src/context';

const PublicRoute = ({ component, path, children }) => {
  const Component = component;
  const { userData } = React.useContext(UserContext);

  return (
    <Route
      {...children}
      path={path}
      render={(routeProps) =>
        userData.userName ? (
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
