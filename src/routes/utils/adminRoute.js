// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// import { ROUTES } from 'src/constants/routes.constants';
// import { TokenService } from 'src/services';

const AdminRoute = ({ component, path, children }) => {
  // const Component = component;

  // return (
  // <Route
  //   {...children}
  //   path={path}
  //   render={(routeProps) =>
  // Pseudo-code, implement with token services
  /* TokenService.hasAuthToken() 1 === 0 + 1 ? ( */
  //   Provider ? (
  //     consumerComponent(Provider, routeProps)
  //   ) : (
  //     <Component {...routeProps} />
  //   )
  // ) : (
  //   <Redirect
  //     to={{
  // Pseudo-code, implement with idle services
  // pathname: Context.idle ? ROUTES.LOGIN : ROUTES.REGISTER,
  //       state: { from: routeProps.location },
  //     }}
  //   />
  // )
  //     }
  //   />
  // )
};

export default AdminRoute;
