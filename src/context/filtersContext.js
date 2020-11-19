import React from 'react';

import { FiltersService } from 'src/services';

const FiltersContext = React.createContext(null);

const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const getFilters = async () => {
      const filterData = await FiltersService.getAllFilters();

      if (!filterData || 'error' in filterData) {
        console.error(filterData.error);
        setError(filterData.error);
      } else setFilters(filterData);
    };

    getFilters();
  }, []);

  const value = {
    filters,
    error,
  };

  return (
    <FiltersContext.Provider value={value}>
      {children}
    </FiltersContext.Provider>
  );
};

export { FiltersContext, FiltersProvider };
