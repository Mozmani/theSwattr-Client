import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from 'src/context';
import { TokenService } from 'src/services';
import './header.scss';
import logo from 'src/images/logo.png';

const Header = () => {
  const Context = useContext(UserContext);
  const loggedIn = TokenService.hasAuthToken();

  const handleLogoutClick = () => {
    Context.processLogout();
  };

  const loginLink = (
    <nav className="nav-links">
      <Link to="/login">Login</Link>
      <div className="seperator">{' | '}</div>
      <Link to="/register">Sign up</Link>
    </nav>
  );

  const logoutLink = (
    <div>
      <span>{Context.userData.userName}</span>
      <nav>
        <Link onClick={handleLogoutClick} to="/login">
          Logout
        </Link>
      </nav>
    </div>
  );

  // ! DELETE THESE LATER
  const navButtons = ['/', '/dashboard'].map((route) => (
    <Link key={route} to={route}>
      <button>Quick nav: {route}</button>
    </Link>
  ));

  return (
    <header className="dash-header">
      {navButtons}
      <h1>
        <Link to="/">
          <div className="logo-container">
            <img className="logo" src={logo} alt="logo" />
          </div>
        </Link>
      </h1>
      {loggedIn ? logoutLink : loginLink}
    </header>
  );
};

export default Header;
