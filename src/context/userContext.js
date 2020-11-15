import React from 'react';

const userContext = React.createContext(null);

const UserProvider = ({ children }) => {
  const value = {};

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

const UserContext = React.useContext(userContext);

export { UserContext, UserProvider };
