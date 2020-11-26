import React from 'react';

import { AuthService, TokenService } from 'src/services';
import { UserContext } from 'src/context/userContext';
import { RegistrationForm } from 'src/components';

const RegisterRoute = ({ history }) => {
  const context = React.useContext(UserContext);

  const handleRegistrationSuccess = (name, pass) => {
    AuthService.postLogin({
      user_name: name,
      password: pass,
    }).then((res) => {
      TokenService.saveAuthToken(res.authToken);
      context.processLogin();
    });

    history.push('/dashboard');
  };

  return (
    <>
      <RegistrationForm
        onRegistrationSuccess={handleRegistrationSuccess}
      />
    </>
  );
};

export default RegisterRoute;
