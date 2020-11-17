import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../../services/token.service'
import {UserContext} from '../../context/userContext'
import { ROUTES } from 'src/constants/routes.constants';
// import { TokenService } from 'src/services';
import { BugsProvider, CommentsProvider } from 'src/context';

// const PrivateRoute = ({ component, path, children }) => {
//   const Component = component;

//   const consumerComponent = (Provider, routeProps) => (
//     <Provider>
//       <Component {...routeProps} />
//     </Provider>
//   );

//   let Provider;
//   switch (path) {
//     case ROUTES.BUGS:
//       Provider = BugsProvider;
//       break;

//     case ROUTES.COMMENTS:
//       Provider = CommentsProvider;
//       break;

//     default:
//       Provider = null;
//       break;
//   }

//   return (
//     <Route
//       {...children}
//       path={path}
//       render={(routeProps) =>
//         // Pseudo-code, implement with token services
//         /* TokenService.hasAuthToken() */ 1 === 0 + 1 ? (
//           Provider ? (
//             consumerComponent(Provider, routeProps)
//           ) : (
//             <Component {...routeProps} />
//           )
//         ) : (
//           <Redirect
//             to={{
//               // Pseudo-code, implement with idle services
//               //pathname: Context.idle ? ROUTES.LOGIN : ROUTES.REGISTER,
//               pathname:'/login',
//               state: { from: routeProps.location },
//             }}
//           />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;
export default function PrivateRoute({ component, ...props }) {
  const Component = component;
  return (
    <Route
      {...props}
      render={(componentProps) =>
        TokenService.hasAuthToken() ? (
          <Component {...componentProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: componentProps.location },
            }}
          />
        )
      }
    />
  );
}