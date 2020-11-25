import React from 'react';

import { LoginForm } from 'src/components';
import './loginRoute.scss';

const LoginRoute = ({ history }) => {
  let handleLoginSuccess = () => {
    history.push('/dashboard');
  };

  return (
    <>
      <h2 className="welcome">
        ENTER USERNAME AND
        <br />
        PASSWORD TO LOGIN
      </h2>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </>
  );
};

export default LoginRoute;
