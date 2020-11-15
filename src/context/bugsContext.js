import React from 'react';

const bugsContext = React.createContext(null);

const BugsProvider = ({ children }) => {
  const value = {};

  return (
    <BugsContext.Provider value={value}>
      {children}
    </BugsContext.Provider>
  );
};

const BugsContext = React.useContext(bugsContext);

export { BugsContext, BugsProvider };
