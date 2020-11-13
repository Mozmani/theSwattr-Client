import React from 'react';

export const thingContext = React.createContext(null);

const thingProvider = ({ children }) => {
  const value = {};

  return (
    <thingContext.Provider value={value}>
      {children}
    </thingContext.Provider>
  );
};

export default thingProvider;
