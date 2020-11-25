import React from 'react';
import { Switch } from 'react-router-dom';

import { ROUTES } from 'src/constants/routes.constants';
import { Header } from 'src/components';
import {
  HomeRoute,
  DashboardRoute,
  LoginRoute,
  RegisterRoute,
  PrivateRoute,
  PublicRoute,
} from 'src/routes';
import './app.scss';

const { BUGS, COMMENTS, LOGIN, REGISTER } = ROUTES;

const App = () => {
  return (
    <>
      <Header />
      <div className="app-container">
        <Switch>
          <PublicRoute exact path={LOGIN} component={LoginRoute} />
          <PublicRoute
            exact
            path={REGISTER}
            component={RegisterRoute}
          />
          <PrivateRoute exact path="/" component={HomeRoute} />
          <PrivateRoute
            path="/dashboard"
            component={DashboardRoute}
          />
        </Switch>
      </div>
    </>
  );
};

export default App;
