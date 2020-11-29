import React from 'react';
import { Link } from 'react-router-dom';

import './loginForm.scss';

import useFormState from 'src/hooks/useFormState';
import { UserContext } from 'src/context';
import { AuthService, TokenService } from 'src/services';

const LoginForm = ({ onLoginSuccess }) => {
  const [error, setError] = React.useState(null);
  const Context = React.useContext(UserContext);

  const { formFields, handleOnChange } = useFormState({
    user_name: '',
    password: '',
  });

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const res = await AuthService.postLogin({
      ...formFields,
    });

    if (res.error) {
      console.error(res);
      setError(res.error);
      return;
    }

    TokenService.saveAuthToken(res.authToken);
    Context.processLogin();
    onLoginSuccess();
  };

  const renderError = !error ? null : (
    <div role="alert">{`Oh no! ${error}`}</div>
  );

  const fields = ['user_name', 'password'];

  const formAttr = {
    user_name: { displayText: 'Username', inputType: 'text' },
    password: { displayText: 'Password', inputType: 'password' },
  };

  const inputFields = fields.map((field) => (
    <label
      key={field}
      htmlFor={field}
      className={`${field}-login-label`}
    >
      {formAttr[field].displayText}
      <input
        required
        id={field}
        type={formAttr[field].inputType}
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
        {inputFields}
        <footer>
          <button type="submit" className="submit-button">
            LOGIN
          </button>
          <Link to="/register" className="link-to-register">
            Don&apos;t have an account?
          </Link>
        </footer>
      </form>
    </>
  );
};

export default LoginForm;
