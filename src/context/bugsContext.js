import React from 'react';

import { BugsService } from 'src/services';
import { UserContext } from './userContext';

const BugsContext = React.createContext(null);

const BugsProvider = ({ allApps, selectedApp, children }) => {
  const [bugs, setBugs] = React.useState({});
  const [userBugs, setUserBugs] = React.useState([]);
  const [error, setError] = React.useState(null);

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
          userData.userName,
        );

        if (!userBugsData || 'error' in userBugsData) {
          console.error(userBugsData.error);
          setError(userBugsData.error);
        } else setUserBugs(userBugsData.userBugs);
      }
    };

    if (selectedApp || (!userData.dev && userData.userName)) {
      getBugs();
    }
  }, [userData.dev, selectedApp, userData.userName]);

  const addNewBug = (bugInfo) => {
    setBugs((prev) => ({
      ...prev,
      bugsPending: [...(prev.bugsPending || []), bugInfo],
    }));
  };

  const addNewUserBug = (bugInfo) => {
    setUserBugs((prev) => [...prev, bugInfo]);
  };

  const updateBugs = async (app) => {
    const bugsData = await BugsService.getAllBugsSeverityApp(app);

    if (!bugsData || 'error' in bugsData) {
      console.error(bugsData.error);
      setError(bugsData.error);
    } else setBugs(bugsData);
  };

  const value = {
    allApps,
    selectedApp,
    bugs,
    userBugs,
    error,
    addNewBug,
    addNewUserBug,
    updateBugs,
  };

  return (
    <BugsContext.Provider value={value}>
      {children}
    </BugsContext.Provider>
  );
};

export { BugsContext, BugsProvider };
