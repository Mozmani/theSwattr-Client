import React from 'react';
import { Switch } from 'react-router-dom';

import './app.scss';

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

const { DASHBOARD, LOGIN, REGISTER } = ROUTES;

const App = () => {
  return (
    <>
      <Header />
      <div className="app-container">
        <Switch>
          <PrivateRoute exact path="/" component={HomeRoute} />
          <PrivateRoute path={DASHBOARD} component={DashboardRoute} />
          <PublicRoute path={LOGIN} component={LoginRoute} />
          <PublicRoute path={REGISTER} component={RegisterRoute} />
        </Switch>
      </div>
    </>
  );
};

export default App;
