import React from 'react';
import { Link } from 'react-router-dom';

import './registrationForm.scss';

import { RegisterFields } from 'src/helpers/formFields';
import useFormState from 'src/hooks/useFormState';
import { AuthService } from 'src/services';

const RegistrationForm = ({ onRegistrationSuccess }) => {
  const [error, setError] = React.useState(null);

  const { formFields, handleOnChange } = useFormState({
    first_name: '',
    last_name: '',
    user_name: '',
    password: '',
    email: '',
  });

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const res = await AuthService.postRegistration(formFields);

    if (res.error) {
      console.error(res);
      setError(res.error);
      return;
    }

    const { user_name, password } = formFields;
    onRegistrationSuccess(user_name, password);
  };

  const renderError = !error ? null : (
    <div role="alert">{`Oh no! ${error}`}</div>
  );

  const inputFields = RegisterFields.getInputFields(
    formFields,
    handleOnChange,
  );

  return (
    <>
    <div className='logDisplay'>
      <p>Welcome to theSwattr</p>
    {renderError}
    </div>
      <form className="register-form" onSubmit={handleSubmit}>
        {inputFields}
        <footer>
          <button type="submit" className="register-button">
            Sign up
          </button>{' '}
          <Link to="/login" className="link-to-login">
            Already have an account?
          </Link>
        </footer>
      </form>
    </>
  );
};

export default RegistrationForm;
