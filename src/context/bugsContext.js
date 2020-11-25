import React from 'react';

import { BugsService } from 'src/services';
import { UserContext } from './userContext';

const BugsContext = React.createContext(null);
//so now hopefully we can pull apps here

const BugsProvider = ({ children, app }) => {
  const [bugs, setBugs] = React.useState(null);
  const [userBugs, setUserBugs] = React.useState(null);
  const [error, setError] = React.useState(null);

  const {
    userData: { userName },
  } = React.useContext(UserContext);

  React.useEffect(() => {
    const getBugs = async () => {
      const bugData = await BugsService.getAllBugsDev(app);
      const userBugsData = await BugsService.getAllBugsUser(userName);

      setUserBugs(userBugsData);

      if (!bugData || 'error' in bugData) {
        console.error(bugData.error);
        setError(bugData.error);
      } else setBugs(bugData);

      if (!userBugsData || 'error' in userBugsData) {
        console.error(userBugsData.error);
        setError(userBugsData.error);
      } else setUserBugs(userBugsData);
    };

    if (userName) {
      getBugs();
    }
  }, [app, userName]);

  //console.log({ userBugs });
  //user bugs will not pass down
  const value = {
    bugs,
    userBugs,
    error,
  };

  return (
    <BugsContext.Provider value={value}>
      {children}
    </BugsContext.Provider>
  );
};

export { BugsContext, BugsProvider };
