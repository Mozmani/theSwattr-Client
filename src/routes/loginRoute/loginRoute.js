import React from 'react';

import { LoginForm } from 'src/components';

const LoginRoute = ({ history }) => {
  let handleLoginSuccess = () => {
    history.push('/');
  };

  return (
    <>
      <h2>Login</h2>

      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </>
  );
};

export default LoginRoute;
