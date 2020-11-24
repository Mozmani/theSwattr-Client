import React from 'react';

import { AuthService, IdleService, TokenService } from 'src/services';

const UserContext = React.createContext({});

const UserProvider = ({ children }) => {
  const [userData, setUserData] = React.useState({});

  const processLogout = () => {
    TokenService.clearAuthToken();
    setUserData({});
  };

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

  const logoutBecauseIdle = React.useCallback(() => {
    IdleService.clearCallbackBeforeExpiry();
    IdleService.removeIdleResets();
    processLogout();
  }, []);

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

  // ? for page refresh
  React.useEffect(() => {
    if (TokenService.hasAuthToken()) {
      processLogin();
    }
  }, [processLogin]);

  const value = {
    userData,
    processLogin,
    processLogout,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
