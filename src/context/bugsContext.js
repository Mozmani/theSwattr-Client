import React from 'react';

import { BugsService } from 'src/services';
import { UserContext } from './userContext';

const BugsContext = React.createContext(null);

const BugsProvider = ({ allApps, selectedApp, children }) => {
  const [bugs, setBugs] = React.useState(null);
  const [userBugs, setUserBugs] = React.useState(null);
  const [error, setError] = React.useState(null);

  const {
    userData: { userName },
  } = React.useContext(UserContext);

  const { userData } = React.useContext(UserContext);
  React.useEffect(() => {
    const getBugs = async () => {
      if (userData.dev) {
        const bugsData = await BugsService.getAllBugsSeverityApp(
          selectedApp.rawName,
        );

        if (!bugsData || 'error' in bugsData) {
          console.error(bugsData.error);
          setError(bugsData.error);
        } else setBugs(bugsData);
      } else {
        const userBugsData = await BugsService.getAllBugsUser(
          userName,
        );

        if (!userBugsData || 'error' in userBugsData) {
          console.error(userBugsData.error);
          setError(userBugsData.error);
        } else setUserBugs(userBugsData.userBugs);
      }
    };

    if (selectedApp) {
      getBugs();
    }
  }, [userData.dev, selectedApp, userName]);

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

  return (
    <BugsContext.Provider value={value}>
      {children}
    </BugsContext.Provider>
  );
};

export { BugsContext, BugsProvider };
