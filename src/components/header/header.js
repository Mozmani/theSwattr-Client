import React from 'react';
import { Link } from 'react-router-dom'
import TokenService from '../../services/tokenService'



const Header = () => {
  function renderLogoutLink() {
    return (
      <div>
        <span>
          {this.context.user.name}
        </span>
        <nav>
          <Link
            onClick={this.handleLogoutClick}
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