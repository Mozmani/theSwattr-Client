import React, { useContext, useState } from 'react';
import { UserContext, UserProvider } from '../../context/userContext';
import AuthService from '../../services/auth.service';

const LoginForm = (props) => {
  const context = useContext(UserContext);

  let [error, setError] = useState(null);

  let handleSubmit = (ev) => {
    ev.preventDefault();
    const { user_name, password } = ev.target;

    //this.setState({ error: null })

    AuthService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then((res) => {
        user_name.value = '';
        password.value = '';
        context.processLogin(res.authToken);
        props.onLoginSuccess();
      })
      .catch((res) => {
        //console.log('res here',res)
        setError(res.error);
      });
  };

  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <div role="alert">
        <br></br>
        <p>{error}</p>
      </div>
      <div>
        <label htmlFor="login-username-input">Username</label>
        <input id="login-username-input" name="user_name" required />
      </div>
      <div>
        <label htmlFor="login-password-input">Password</label>
        <input
          id="login-password-input"
          name="password"
          type="password"
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
