import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { UserContext } from "../../context/userContext";

const RegistrationForm = (props) => {
  let [error, setError] = useState(null);
  let [user_name, setUser] = useState(null);
  let [pword, setPass] = useState(null);

  const context = useContext(UserContext);

  let handleSubmit = async (ev) => {
    ev.preventDefault();
    const { firstName, lastName, email, username, password } = ev.target;

    let responce = await AuthService.postUser({
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      user_name: username.value,
      password: password.value,
    });

    if (!responce.ok) {
      setError(responce.error);
    }

    props.onRegistrationSuccess(user_name, pword);
  };

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
        <input id="registration-first-name-input" name="firstName" required />
      </div>
      <div>
        <label htmlFor="registration-last-name-input">
          Enter your last name
        </label>
        <input id="registration-last-name-input" name="lastName" required />
      </div>
      <div>
        <label htmlFor="registration-email-input">Enter your E-mail</label>
        <input id="registration-email-input" name="email" required />
      </div>
      <div>
        <label htmlFor="registration-username-input">Choose a username</label>
        <input
          id="registration-username-input"
          name="username"
          onChange={(e) => setUser(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="registration-password-input">Choose a password</label>
        <input
          id="registration-password-input"
          name="password"
          type="password"
          onChange={(e) => setPass(e.target.value)}
          required
        />
      </div>
      <footer>
        <button type="submit">Sign up</button>{" "}
        <Link to="/login">Already have an account?</Link>
      </footer>
    </form>
  );
};

export default RegistrationForm;
