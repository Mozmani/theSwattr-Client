import React from 'react';
import { Switch } from 'react-router-dom';

import { ROUTES } from 'src/constants/routes.constants';
import {
  BugsRoute,
  CommentsRoute,
  DashboardRoute,
  LoginRoute,
  RegisterRoute,
  PrivateRoute,
  PublicRoute,
} from 'src/routes';

const { BUGS, COMMENTS, LOGIN, REGISTER } = ROUTES;

const App = () => {
  //? useState hook: [ stateVar, setState-function ] = useState(initial-state)
  const [hello, setHello] = React.useState('');
  const [world, setWorld] = React.useState('');

  //? useEffect hook: simulates lifecycle-methods
  React.useEffect(() => {
    const compDidMount = async () => {
      setTimeout(() => {
        setHello('Hello ');
      }, 5e3);
    };

    compDidMount();
  }, []);
  //? [] === componentDidMount

  React.useEffect(() => {
    const compDidUpdate = async () => {
      setTimeout(() => {
        setWorld('World!');
      }, 1e3);
    };

    if (hello) {
      compDidUpdate();
    }
  }, [hello]);
  //? [listener1, listener2, etc...] === componentDidUpdate
  //! will still run on mount, hence the 'if' statement!

  return (
    <>
      <h1 className="example">{hello + world}</h1>
      <main className="main-container">
        <Switch>
          <PublicRoute path={LOGIN} component={LoginRoute} />
          <PublicRoute path={REGISTER} component={RegisterRoute} />
          <PrivateRoute exact path="/" component={DashboardRoute} />
          <PrivateRoute path={BUGS} component={BugsRoute} />
          <PrivateRoute path={COMMENTS} component={CommentsRoute} />
        </Switch>
      </main>
    </>
  );
};

export default App;
