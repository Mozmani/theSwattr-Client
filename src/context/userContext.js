import React from 'react';

import { TokenService } from 'src/services';

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
    });
  }, []);

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
