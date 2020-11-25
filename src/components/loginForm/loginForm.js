import React from 'react';

import useFormState from 'src/hooks/useFormState';
import { UserContext } from 'src/context';
import { AuthService, TokenService } from 'src/services';
import './loginForm.scss';

const LoginForm = ({ onLoginSuccess }) => {
  const [error, setError] = React.useState(null);
  const Context = React.useContext(UserContext);

  const { formFields, setFormFields, handleOnChange } = useFormState({
    user_name: '',
    password: '',
  });

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const { user_name, password } = formFields;

    const res = await AuthService.postLogin({
      user_name,
      password,
    });

    if (res.error) {
      console.error(res);
      setError(res.error);
      return;
    }

    setFormFields({
      user_name: '',
      password: '',
    });

    TokenService.saveAuthToken(res.authToken);
    Context.processLogin();
    onLoginSuccess();
  };

  const renderError = !error ? null : (
    <div role="alert">{`Oh no! ${error}`}</div>
  );

  const fields = ['user_name', 'password'];

  const fieldDisplayText = {
    user_name: 'Username',
    password: 'Password',
  };

  const inputType = {
    user_name: 'text',
    password: 'password',
  };

  const inputFields = fields.map((field) => (
    <label
      key={field}
      htmlFor={field}
      className={`${field}-login-label`}
    >
      {fieldDisplayText[field]}
      <input
        required
        id={field}
        type={inputType[field]}
        value={formFields[field]}
        onChange={handleOnChange(field)}
        className={`${field}-login-input`}
      />
    </label>
  ));

  return (
    <>
      {renderError}
      <form className="LoginForm" onSubmit={handleSubmit}>
        <div>{inputFields}</div>
        <button type="submit" className="submit-button">
          LOGIN
        </button>
      </form>
    </>
  );
};

export default LoginForm;
