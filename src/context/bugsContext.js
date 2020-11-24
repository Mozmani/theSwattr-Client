import React from 'react';

import { BugsService } from 'src/services';
import {UserContext} from './userContext'

const BugsContext = React.createContext(null);

const BugsProvider = ({ children }) => {
  const [bugs, setBugs] = React.useState(null);
  const [error, setError] = React.useState(null);
  let [apps, setApps] = React.useState(null)
  const [userBugs, setUserBugs] = React.useState(null);
  const { userData } = React.useContext(UserContext)
  const [User, setUser] = React.useState(userData.userName)
  
  //this one would work
  //console.log('Here is user',userData.userName)
  
  React.useEffect(() => {
    
    // this would kick back undefined
    console.log('Here is user', User)
    
    const getBugs = async () => {
      
      const appData = await BugsService.getAllApps()
      
      setApps(appData)
      const bugData = await BugsService.getAllBugsDev('main-app');
      const userBugsData = await BugsService.getAllBugsUser(User)
      setUserBugs(userBugsData)

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
