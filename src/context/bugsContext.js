import React from 'react';

const BugsContext = React.createContext(null);

const BugsProvider = ({ children }) => {
  const value = {
    checker: 'bug context',
  };

  return (
    <BugsContext.Provider value={value}>
      {children}
    </BugsContext.Provider>
  );
};

export { BugsContext, BugsProvider };
