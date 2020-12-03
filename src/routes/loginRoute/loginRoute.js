import React from 'react';

import './loginRoute.scss';

import { LoginForm } from 'src/components';

const LoginRoute = ({ history }) => {
  const handleLoginSuccess = () => {
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
