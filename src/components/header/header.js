import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

import logo from 'src/images/logo.png';
import { UserContext } from 'src/context';
import { TokenService } from 'src/services';

const Header = () => {
  const { userData, processLogout } = React.useContext(UserContext);
  const loggedIn = TokenService.hasAuthToken();

  const handleLogoutClick = () => {
    processLogout();
  };

  const loginLink = (
    <nav className="nav-links">
      <Link to="/login">Login</Link>
      <div className="seperator">{' | '}</div>
      <Link to="/register">Sign up</Link>
    </nav>
  );

  const logoutLink = (
    <div className="nav-links">
      <span>Hello {userData.firstName}!</span>
      <nav>
        <Link onClick={handleLogoutClick} to="/login">
          Logout
        </Link>
      </nav>
    </div>
  );

  // ? MOCK NAV BUTTONS
  // const navButtons = ['/', '/dashboard'].map((route) => (
  //   <Link key={route} to={route}>
  //     <button>Quick nav: {route}</button>
  //   </Link>
  // ));

  return (
    <header className="dash-header">
      <h1>
        <Link to="/dashboard">
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
