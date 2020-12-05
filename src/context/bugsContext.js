import React from 'react';

import { BugsService } from 'src/services';
import { UserContext } from './userContext';

const BugsContext = React.createContext(null);

// bugs context provider
const BugsProvider = ({ allApps, selectedApp, children }) => {
  const [bugs, setBugs] = React.useState({});
  const [userBugs, setUserBugs] = React.useState([]);
  const [error, setError] = React.useState(null);

  const { userData } = React.useContext(UserContext);

  // useEffect similar to componentDidmount
  React.useEffect(() => {
    //gets all bugs by severity or by user
    const getBugs = async () => {
      
      //if a dev, gets bugs by severity
      if (userData.dev) {
        const bugsData = await BugsService.getAllBugsSeverityApp(
          selectedApp.rawName,
        );

        if (!bugsData || 'error' in bugsData) {
          console.error(bugsData.error);
          setError(bugsData.error);
        } else setBugs(bugsData);
      //otherwise grabs user bugs
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

  //function to grab bugs after a new one is posted
  const addNewBug = () => {
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
  };


  //function to update bugs once patched
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
    updateBugs,
  };

  return (
    <BugsContext.Provider value={value}>
      {children}
    </BugsContext.Provider>
  );
};

export { BugsContext, BugsProvider };
