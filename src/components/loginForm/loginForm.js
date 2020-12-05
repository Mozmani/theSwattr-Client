import React from "react";
import { Link } from "react-router-dom";

import "./loginForm.scss";

import { LoginFields } from "src/helpers/formFields";
import useFormState from "src/hooks/useFormState";
import { UserContext } from "src/context";
import { AuthService, TokenService } from "src/services";

//login form component
const LoginForm = ({ onLoginSuccess }) => {
  const [error, setError] = React.useState(null);
  const Context = React.useContext(UserContext);

  const { formFields, handleOnChange } = useFormState({
    user_name: "",
    password: "",
  });

  // handles login
  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const res = await AuthService.postLogin(formFields);

    if (res.error) {
      console.error(res);
      setError(res.error);
      return;
    }

    TokenService.saveAuthToken(res.authToken);
    Context.processLogin();
    onLoginSuccess();
  };

  // adds error if exist
  const renderError = !error ? null : (
    <div role="alert">{`Oh no! ${error}`}</div>
  );

  //adds input fields from custom react hook
  const inputFields = LoginFields.getInputFields(formFields, handleOnChange);

  return (
    <>
      <div className="logDisplay">
        <p>Test Developer Account:</p>
        <p>Username: admin</p>
        <p>Password: pass</p>
        {renderError}
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
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
