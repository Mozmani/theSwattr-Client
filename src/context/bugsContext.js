import React from 'react';

import { BugsService } from 'src/services';

const BugsContext = React.createContext(null);

const BugsProvider = ({ children }) => {
  const [bugs, setBugs] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const getBugs = async () => {
      const bugData = await BugsService.getAllBugs();

      if (!bugData || 'error' in bugData) {
        console.error(bugData.error);
        setError(bugData.error);
      } else setBugs(bugData);
    };

    getBugs();
  }, []);

  const value = {
    bugs,
    error,
  };

  return (
    <BugsContext.Provider value={value}>
      {children}
    </BugsContext.Provider>
  );
};

export { BugsContext, BugsProvider };
