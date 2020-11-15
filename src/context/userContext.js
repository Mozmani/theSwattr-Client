import React from 'react';

const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
  const value = {};

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
