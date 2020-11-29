import React from 'react';
import { Link } from 'react-router-dom';

import './registrationForm.scss';

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

    const res = await AuthService.postRegistration({
      ...formFields,
    });

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

  const fields = [
    'first_name',
    'last_name',
    'email',
    'user_name',
    'password',
  ];

  const formAttr = {
    first_name: {
      displayText: 'Enter First Name',
      inputType: 'text',
    },
    last_name: { displayText: 'Enter Last Name', inputType: 'text' },
    email: { displayText: 'Enter E-mail', inputType: 'text' },
    user_name: {
      displayText: 'Choose a Username',
      inputType: 'text',
    },
    password: {
      displayText: 'Choose a Password',
      inputType: 'password',
    },
  };

  const inputFields = fields.map((field) => (
    <label
      key={field}
      htmlFor={field}
      className={`${field}-register-label`}
    >
      {formAttr[field].displayText}
      <input
        required
        id={field}
        type={formAttr[field].inputType}
        value={formFields[field]}
        onChange={handleOnChange(field)}
        className={`${field}-register-input`}
      />
    </label>
  ));

  return (
    <>
      {renderError}
      <form className="RegisterForm" onSubmit={handleSubmit}>
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
