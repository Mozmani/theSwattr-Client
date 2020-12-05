import React from "react";
import { Link } from "react-router-dom";

import "./header.scss";

import logo from "src/images/logo.png";
import { UserContext } from "src/context";
import { TokenService } from "src/services";

//header component
const Header = () => {
  const { userData, processLogout } = React.useContext(UserContext);
  const loggedIn = TokenService.hasAuthToken();

  //handles logout
  const handleLogoutClick = () => {
    processLogout();
  };

  // renders links for log-in
  const loginLink = (
    <nav className="nav-links">
      <Link to="/login">Login</Link>
      <div className="seperator">{" | "}</div>
      <Link to="/register">Sign up</Link>
    </nav>
  );

  // renders links for log outs
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
