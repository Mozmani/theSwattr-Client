import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token.service';

const Header = () => {
  const Context = useContext(UserContext);
  const loggedIn = TokenService.hasAuthToken();

  const handleLogoutClick = () => {
    Context.processLogout();
  };

  const loginLink = (
    <nav>
      <Link to="/login">Login</Link>{' '}
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
    <header>
      {navButtons}
      <h1>
        <Link to="/">theSwatter</Link>
      </h1>
      {loggedIn ? logoutLink : loginLink}
    </header>
  );
};

export default Header;
