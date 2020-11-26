import React from 'react';
import { Link } from 'react-router-dom';

import './registrationForm.scss';

import { AuthService } from 'src/services';
import { UserContext } from 'src/context';

const RegistrationForm = ({ onRegistrationSuccess }) => {
  const [error, setError] = React.useState(null);
  const [user_name, setUser] = React.useState(null);
  const [pword, setPass] = React.useState(null);

  const context = React.useContext(UserContext);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const {
      firstName,
      lastName,
      email,
      username,
      password,
    } = ev.target;

    const response = await AuthService.postUser({
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      user_name: username.value,
      password: password.value,
    });

    if (!response.ok) {
      setError(response.error);
    }

    onRegistrationSuccess(user_name, pword);
  };

  const renderError = !error ? null : (
    <div role="alert">{`Oh no! ${error}`}</div>
  );

  return (
    <>
      {renderError}
      <form className="RegisterForm" onSubmit={handleSubmit}>
        <div>
          <label
            className="registration-first-name-label"
            htmlFor="registration-first-name-input"
          >
            Enter First Name
          </label>
          <input
            id="registration-first-name-input"
            className="registration-first-name-input"
            name="firstName"
            required
          />
        </div>
        <div>
          <label
            className="registration-last-name-label"
            htmlFor="registration-last-name-input"
          >
            Enter Last Name
          </label>
          <input
            id="registration-last-name-input"
            className="registration-last-name-input"
            name="lastName"
            required
          />
        </div>
        <div>
          <label
            className="registration-email-label"
            htmlFor="registration-email-input"
          >
            Enter E-mail
          </label>
          <input
            id="registration-email-input"
            className="registration-email-input"
            name="email"
            required
          />
        </div>
        <div>
          <label
            className="registration-username-label"
            htmlFor="registration-username-input"
          >
            Choose a Username
          </label>
          <input
            id="registration-username-input"
            className="registration-username-input"
            name="username"
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>
        <div>
          <label
            className="registration-password-label"
            htmlFor="registration-password-input"
          >
            Choose a Password
          </label>
          <input
            id="registration-password-input"
            className="registration-password-input"
            name="password"
            type="password"
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>
        <footer>
          <button className="register-button" type="submit">
            Sign up
          </button>{' '}
          <Link to="/login">Already have an account?</Link>
        </footer>
      </form>
    </>
  );
};

export default RegistrationForm;
