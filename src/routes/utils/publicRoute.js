import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../../services/tokenService'
import {UserContext} from '../../context/userContext'
// import { TokenService } from 'src/services';
// import { BugsContext } from 'src/context';

// const PublicRoute = ({ component, path, children }) => {
//   const Component = component;

//   return (
//     <Route
//       {...children}
//       path={path}
//       render={(routeProps) =>
//         // Pseudo-code, implement with token services
//         /* TokenService.hasAuthToken() */ 1 === 0 + 1 ? (
//           <Redirect
//             to={{
//               pathname: '/',
//               state: { from: routeProps.location },
//             }}
//           />
//         ) : (
//           <Component {...routeProps} />
//         )
//       }
//     />
//   );
// };

// export default PublicRoute;
export default function PublicRoute({ component, ...props }) {
  const Component = component
  return (
    <Route
      {...props}
      render={componentProps => (
        <UserContext.Consumer>
          {userContext =>
            !!userContext.user.id
              ? <Redirect to={'/'} />
              : <Component {...componentProps} />
          }
        </UserContext.Consumer>
      )}
    />
  )
}
