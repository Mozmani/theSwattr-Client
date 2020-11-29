import React from 'react';

import { AuthService, TokenService } from 'src/services';
import { UserContext } from 'src/context/userContext';
import { RegistrationForm } from 'src/components';

const RegisterRoute = ({ history }) => {
  const Context = React.useContext(UserContext);

  const handleRegistrationSuccess = (user_name, password) => {
    const res = AuthService.postLogin({
      user_name,
      password,
    });

    if (res.error) {
      console.error(res);
      return;
    }

    TokenService.saveAuthToken(res.authToken);
    Context.processLogin();
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
