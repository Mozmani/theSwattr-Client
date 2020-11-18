import React from 'react';
import { Switch } from 'react-router-dom';

import { ROUTES } from 'src/constants/routes.constants';
import {
  BugsRoute,
  CommentsRoute,
  DashboardRoute,
  LoginRoute,
  RegisterRoute,
} from 'src/routes';

import PrivateRoute from '../routes/utils/privateRoute';
import PublicRoute from '../routes/utils/publicRoute';

import Header from '../components/header/header';

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
      }, 1e3);
    };

    compDidMount();
  }, []);
  //? [] === componentDidMount

  React.useEffect(() => {
    const compDidUpdate = async () => {
      setTimeout(() => {
        console.log(world);
        setWorld('World!');
      }, 1e3);
    };

    if (hello) {
      compDidUpdate();
    }
  }, [hello]);
  //? [listener1, listener2, etc...] === componentDidUpdate
  //! will still run on mount, hence the 'if' statement!

  // <h1 className="example">{hello + world}</h1>
  return (
    <>
      <Header />
      <main className="main-container">
        <Switch>
          <PublicRoute exact path={LOGIN} component={LoginRoute} />
          <PublicRoute
            exact
            path={REGISTER}
            component={RegisterRoute}
          />
          <PrivateRoute exact path="/" component={DashboardRoute} />
          <PrivateRoute exact path={BUGS} component={BugsRoute} />
          <PrivateRoute
            exact
            path={COMMENTS}
            component={CommentsRoute}
          />
        </Switch>
      </main>
    </>
  );
};

export default App;
