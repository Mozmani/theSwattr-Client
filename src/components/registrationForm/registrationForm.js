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
      labelClass: 'first-name-register-label',
      inputClass: 'first-name-register-input',
    },
    last_name: {
      displayText: 'Enter Last Name',
      inputType: 'text',
      labelClass: 'last-name-register-label',
      inputClass: 'last-name-register-input',
    },
    email: {
      displayText: 'Enter E-mail',
      inputType: 'text',
      labelClass: 'email-register-label',
      inputClass: 'email-register-input',
    },
    user_name: {
      displayText: 'Choose a Username',
      inputType: 'text',
      labelClass: 'user-name-register-label',
      inputClass: 'user-name-register-input',
    },
    password: {
      displayText: 'Choose a Password',
      inputType: 'password',
      labelClass: 'password-register-label',
      inputClass: 'password-register-input',
    },
  };

  const inputFields = fields.map((field) => (
    <label
      key={field}
      htmlFor={field}
      className={formAttr[field].labelClass}
    >
      {formAttr[field].displayText}
      <input
        required
        id={field}
        type={formAttr[field].inputType}
        value={formFields[field]}
        onChange={handleOnChange(field)}
        className={formAttr[field].inputClass}
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
