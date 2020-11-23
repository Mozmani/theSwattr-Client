
import React, {useContext} from 'react';
import RegistrationForm from '../../components/registrationForm/registrationForm'
import AuthService from "../../services/auth.service";
import TokenService from '../../services/token.service'
import {UserContext} from '../../context/userContext'

const RegisterRoute = (props) => {
  const context = useContext(UserContext)

  let handleRegistrationSuccess = (name, pass) => {
     AuthService.postLogin({
      user_name: name,
      password: pass,
    })
    .then(res => {
      TokenService.saveAuthToken(res.authToken);
      context.processLogin()
    })

    props.history.push('/')
  }
  
  return <>
  
  <RegistrationForm 
  onRegistrationSuccess={handleRegistrationSuccess}
  />
  </>;
};

export default RegisterRoute;