import React from 'react';

import { BugsService } from 'src/services';
import { UserContext } from './userContext';

const BugsContext = React.createContext(null);
//so now hopefully we can pull apps here

const BugsProvider = ({ children, app }) => {
  const { userData } = React.useContext(UserContext);
  
  const userLog = false;
  const [user, setUser] = React.useState(userData.userName)
  const [bugs, setBugs] = React.useState(null);
  const[userBugs, setUserBugs] = React.useState(null);
  const [error, setError] = React.useState(null);

  if(userLog === null && userData.userName){
    setUser(userData.userName)
  }
  

  console.log('Here is user', user);
  //console.log({app})
  
  React.useEffect(() => {
   

    const getBugs = async () => {
      await setUser(userData.userName)
      const bugData = await BugsService.getAllBugsDev(app);
      const userBugsData = await BugsService.getAllBugsUser(user);
      setUserBugs(userBugsData);

      
      if (!bugData || 'error' in bugData) {
        console.error(bugData.error);
        setError(bugData.error);
      } else setBugs(bugData);
    };

    getBugs();
  }, []);
  console.log({userBugs})
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
