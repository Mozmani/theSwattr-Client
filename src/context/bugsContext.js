import React from 'react';

import { BugsService } from 'src/services';
import { UserContext } from './userContext';

const BugsContext = React.createContext(null);

const BugsProvider = ({ allApps, selectedApp, children}) => {
  const [bugs, setBugs] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [userBugs, setUserBugs] = React.useState(null);

  const {
    userData: { userName },
  } = React.useContext(UserContext);

  const { userData } = React.useContext(UserContext);
  React.useEffect(() => {
    const getBugs = async () => {
      const bugData = await BugsService.getAllBugsSeverityApp(
        selectedApp.rawName,
      );

      if (!bugData || 'error' in bugData) {
        console.error(bugData.error);
        setError(bugData.error);
      } else setBugs(bugData);
    };

    if (selectedApp && userData.dev === true) {
      getBugs();
    }

    const getUserbugs = async () => {
      const userBugsData = await BugsService.getAllBugsUser(userName);
      setUserBugs(userBugsData);
    };

    if (userData.dev === false) {
      getUserbugs();
    }
  }, [selectedApp, userName, bugs]);

  const addNewBug = (bugInfo) => {
    setBugs((prev) => ({
      ...prev,
      bugsPending: [...prev.bugsPending, bugInfo],
    }));
  };

  const addNewUserBug = (bugInfo) => {
    setUserBugs((prev) => ({
      userBugs: [...prev.userBugs, bugInfo],
    }));
  };

  const value = {
    allApps,
    selectedApp,
    bugs,
    error,
    addNewBug,
    addNewUserBug,
    userBugs,
  };
  //console.log('jhrgjhereophr', userData.dev)
  return (
    <BugsContext.Provider value={value}>
      {children}
    </BugsContext.Provider>
  );
};

export { BugsContext, BugsProvider };
