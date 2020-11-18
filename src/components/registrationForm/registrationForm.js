import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/auth.service';

const RegistrationForm = (props) => {
  let [error, setError] = useState(null);

  let handleSubmit = (ev) => {
    ev.preventDefault();
    const {
      firstName,
      lastName,
      username,
      password,
      email,
    } = ev.target;

    AuthService.postUser({
      first_name: firstName.value,
      last_name: lastName.value,
      user_name: username.value,
      password: password.value,
      email: email.value,
    })
      .then((user) => {
        firstName.value = '';
        lastName.value = '';
        username.value = '';
        password.value = '';
        email.value = '';
        props.onRegistrationSuccess();
      })
      .catch((res) => {
        setError(res.error);
      });
  };

  //const error = setError.error
  return (
    <form onSubmit={handleSubmit}>
      <div role="alert">
        <br></br>
        <p>{error}</p>
        <br></br>
      </div>
      <div>
        <label htmlFor="registration-first-name-input">
          Enter your first name
        </label>
        <input
          id="registration-first-name-input"
          name="firstName"
          required
        />
      </div>
      <div>
        <label htmlFor="registration-last-name-input">
          Enter your last name
        </label>
        <input
          id="registration-last-name-input"
          name="lastName"
          required
        />
      </div>
      <div>
        <label htmlFor="registration-email-input">
          Enter your E-mail
        </label>
        <input id="registration-email-input" name="email" required />
      </div>
      <div>
        <label htmlFor="registration-username-input">
          Choose a username
        </label>
        <input
          id="registration-username-input"
          name="username"
          required
        />
      </div>
      <div>
        <label htmlFor="registration-password-input">
          Choose a password
        </label>
        <input
          id="registration-password-input"
          name="password"
          type="password"
          required
        />
      </div>
      <footer>
        <button type="submit">Sign up</button>{' '}
        <Link to="/login">Already have an account?</Link>
      </footer>
    </form>
  );
};

export default RegistrationForm;
