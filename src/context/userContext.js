import React from 'react';

import { AuthService, IdleService, TokenService } from 'src/services';

const UserContext = React.createContext({});

//user context provider
const UserProvider = ({ children }) => {
  const [userData, setUserData] = React.useState({});

  //logout function
  const processLogout = () => {
    window.localStorage.removeItem('selectedApp');
    TokenService.clearAuthToken();
    setUserData({});
  };

  //login function
  const processLogin = React.useCallback(() => {
    const payload = TokenService.parseAuthToken();

    if (payload.message) {
      processLogout();
      return;
    }

    setUserData({
      userName: payload.sub,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      dev: payload.dev,
    });
  }, []);

  //refreshes auth token
  const fetchRefreshToken = React.useCallback(async () => {
    const res = await AuthService.refreshToken();

    if ('error' in res) {
      processLogout();
      return;
    }

    TokenService.saveAuthToken(res.authToken);

    IdleService.loadCallbackBeforeExpiry(() => {
      fetchRefreshToken();
    });
  }, []);

  //logs out user after idle based of idle timer.
  const logoutBecauseIdle = React.useCallback(() => {
    IdleService.clearCallbackBeforeExpiry();
    IdleService.removeIdleResets();
    processLogout();
  }, []);

  // handles logout from idle
  React.useEffect(() => {
    IdleService.setIdleCallback(logoutBecauseIdle);

    if (userData) {
      IdleService.addIdleResets();
      IdleService.loadCallbackBeforeExpiry(() => {
        fetchRefreshToken();
      });
    } else {
      IdleService.removeIdleResets();
      IdleService.clearCallbackBeforeExpiry();
    }
  }, [userData, fetchRefreshToken, logoutBecauseIdle]);

  // handles login
  React.useEffect(() => {
    if (TokenService.hasAuthToken()) {
      processLogin();
    } else window.localStorage.removeItem('selectedApp');
  }, [processLogin]);

  //helps show dev status in client
  const toggleDev = () => {
    setUserData((prev) => ({
      ...prev,
      dev: !prev.dev,
    }));
  };

  const value = {
    userData,
    processLogin,
    processLogout,
    toggleDev,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
