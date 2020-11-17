import React, {useContext} from 'react';
import {UserContext} from '../../context/userContext'
import { Link } from 'react-router-dom'
import TokenService from '../../services/tokenService'



const Header = () => {
  
  let context = useContext(UserContext)
  
  const handleLogoutClick = () => {
    context.processLogout()
  }

  function renderLogoutLink() {
    return (
      <div>
        <span>
          {context.user.name}
        </span>
        <nav>
          <Link
            onClick={handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
      </div>
    )
  }
  
  function renderLoginLink() {
    return (
      <nav>
        <Link to='/login'>Login</Link>
        {' '}
        <Link to='/register'>Sign up</Link>
      </nav>
    )
  }
  
  
  
  
  return (
    <header>
    <h1>
      <Link to='/'>
        theSwatter
      </Link>
    </h1>
    {TokenService.hasAuthToken()
      ? renderLogoutLink()
      : renderLoginLink()}
  </header>
  )
};

export default Header;