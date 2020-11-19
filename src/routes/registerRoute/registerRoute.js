import React from 'react';

import { RegistrationForm } from 'src/components';

const RegisterRoute = (props) => {
  //  defaultProps = {
  //   history: {
  //     push: () => {},
  //   },
  // }

  let handleRegistrationSuccess = () => {
    props.history.push('/login');
  };

  //console.log(props.history)

  return (
    <>
      <RegistrationForm
        onRegistrationSuccess={handleRegistrationSuccess}
      />
    </>
  );
};

export default RegisterRoute;
