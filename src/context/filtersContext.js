import React from 'react';

const FiltersContext = React.createContext(null);

const FiltersProvider = ({ children }) => {
  const value = {
    checker: 'filters context',
  };

  return (
    <FiltersContext.Provider value={value}>
      {children}
    </FiltersContext.Provider>
  );
};

export { FiltersContext, FiltersProvider };
