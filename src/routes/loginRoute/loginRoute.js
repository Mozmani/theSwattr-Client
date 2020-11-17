import React from "react";
import LoginForm from "../../components/loginForm/loginForm";
import { UserContext } from "../../context/userContext";

const LoginRoute = (props) => {
  let handleLoginSuccess = () => {
    props.history.push("/");
  };

  return (
    <>
      <h2>Login</h2>
      
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      
    </>
  );
};

export default LoginRoute;
