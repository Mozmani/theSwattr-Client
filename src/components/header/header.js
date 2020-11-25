import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token.service';
import './header.scss';
import logo from '../../images/logo.png';

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

  return (
    <header className="dash-header">
      <h1>
        <Link to="/">
          <div className="logo-container">
            <img className="logo" src={logo} />
          </div>
        </Link>
      </h1>
      {loggedIn ? logoutLink : loginLink}
    </header>
  );
};

export default Header;
