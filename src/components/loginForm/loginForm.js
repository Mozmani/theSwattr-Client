import React, {useContext} from 'react';
import {UserContext, UserProvider} from '../../context/userContext'
import AuthService from '../../services/auth.service'

const LoginForm = (props) => {
  
  const context = useContext(UserContext)
  
  let handleSubmit = ev => {
    ev.preventDefault()
    const { user_name, password } = ev.target

    
    //this.setState({ error: null })

    AuthService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then(res => {
        user_name.value = ''
        password.value = ''
        context.processLogin(res.authToken)
        props.onLoginSuccess()
      })
      // .catch(res => {
      //   this.setState({ error: res.error })
      // })
  }
  
  console.log(context)
  
  
  return (
    <form
      className='LoginForm'
      onSubmit={handleSubmit}
    >
      <div role='alert'>
        
      </div>
      <div>
        <label htmlFor='login-username-input'>
          Username
        </label>
        <input
          
          id='login-username-input'
          name='user_name'
          required
        />
      </div>
      <div>
        <label htmlFor='login-password-input'>
          Password
        </label>
        <input
          id='login-password-input'
          name='password'
          type='password'
          required
        />
      </div>
      <button type='submit'>
        Login
      </button>
    </form>
  );
};

export default LoginForm;