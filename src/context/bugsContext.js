import React from 'react';

import { BugsService } from 'src/services';
import { UserContext } from './userContext';

const BugsContext = React.createContext(null);
//so now hopefully we can pull apps here

const BugsProvider = ({ children, apps }) => {
  const [bugs, setBugs] = React.useState(null);
  const [error, setError] = React.useState(null);

  const { userData } = React.useContext(UserContext);


  
  React.useEffect(() => {
    console.log('Here is user', userData);

    const getBugs = async () => {
      const bugData = await BugsService.getAllBugsDev('main-app');
      //const userBugsData = await BugsService.getAllBugsUser(userData.userName);
      //setUserBugs(userBugsData);

      if (!bugData || 'error' in bugData) {
        console.error(bugData.error);
        setError(bugData.error);
      } else setBugs(bugData);
    };

    getBugs();
  }, []);

  //user bugs will not pass down
  const value = {
    bugs,
    //userBugs,
    error,
  };

  return (
    <BugsContext.Provider value={value}>
      {children}
    </BugsContext.Provider>
  );
};

export { BugsContext, BugsProvider };
